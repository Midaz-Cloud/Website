// Función de Vercel: recibe la solicitud de alta de /comenzar y la envía por correo a soporte desde una cuenta de Gmail.
// Variables en Vercel: GMAIL_USER y GMAIL_APP_PASSWORD (contraseña de aplicación de Google, no la normal),
// y ALTA_TO (destinatario, por defecto soporte@midazve.com).
// Registro de evidencias en el Hub (Guía de Implementación, Fase 2b): HUB_LEGAL_URL (URL completa de
// POST /public/legal/prospects) y LEGAL_SITE_KEY (la misma llave que tiene el Hub). Contrato en el repo del Hub:
// packages/backend/src/legal/API_CONTRACT.md. Sin esas variables, la evidencia viaja solo en el correo.
import nodemailer from "nodemailer";
import { acceptedDocuments } from "../src/data/legal.mjs";

const FIELDS = {
    name: "Nombre",
    company: "Empresa",
    rif: "RIF",
    email: "Correo",
    phone: "Teléfono",
    plan: "Plan",
};

function clean(v) {
    return String(v == null ? "" : v).replace(/[\r\n]+/g, " ").trim().slice(0, 200);
}

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ ok: false, error: "method" });
    }

    const body = typeof req.body === "string" ? safeJson(req.body) : req.body || {};
    // Campo trampa: los bots lo llenan, las personas no lo ven.
    if (body.website) return res.status(200).json({ ok: true });

    const data = {};
    for (const key of Object.keys(FIELDS)) data[key] = clean(body[key]);
    const missing = Object.keys(FIELDS).filter((k) => !data[k]);
    if (missing.length || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) {
        return res.status(400).json({ ok: false, error: "datos", missing });
    }

    // Aceptación de los documentos legales: obligatoria, no basta con la validación del navegador.
    const aceptacion = body.aceptacion && typeof body.aceptacion === "object" ? body.aceptacion : {};
    if (aceptacion.acepta !== true) {
        return res.status(400).json({ ok: false, error: "aceptacion" });
    }
    const documentos = acceptedDocuments();
    // Si el navegador mostró otras versiones (página vieja en caché), se pide recargar para aceptar las vigentes.
    if (Array.isArray(aceptacion.documentos)) {
        const vistas = new Map(aceptacion.documentos.map((d) => [clean(d && d.doc), clean(d && d.version)]));
        if (documentos.some((d) => vistas.get(d.doc) !== d.version)) {
            return res.status(409).json({ ok: false, error: "versiones" });
        }
    }
    // Todo lo demás lo toma el servidor: fecha y hora en UTC, IP y navegador.
    const evidencia = {
        documentos: documentos.map(({ doc, version, sha256, url }) => ({ doc, version, sha256, url })),
        fecha: new Date().toISOString(),
        ip: clientIp(req),
        navegador: clean(req.headers["user-agent"]).slice(0, 200) || "(sin user-agent)",
        canal: "web",
        comercial: aceptacion.comercial === true,
    };

    // Respuestas de solo tocar sobre el negocio ("Pregunta: respuesta").
    const perfil = (Array.isArray(body.perfil) ? body.perfil : []).slice(0, 12).map(clean).filter(Boolean);

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return res.status(503).json({ ok: false, error: "sin-configurar" });

    // Registro inalterable de evidencias en el Hub. Si falla, el alta sigue y el correo dice qué pasó.
    const registro = await guardarEnHub(data, perfil, evidencia);

    const text = [
        "Nueva solicitud de alta en Midaz",
        "",
        ...Object.entries(FIELDS).map(([k, label]) => `- ${label}: ${data[k]}`),
        ...(perfil.length ? ["", "Negocio", ...perfil.map((l) => `- ${l}`)] : []),
        "",
        "Aceptación",
        ...evidencia.documentos.map((d) => `- ${d.doc} ${d.version} · SHA-256 ${d.sha256}`),
        `- Fecha y hora (servidor, UTC): ${evidencia.fecha}`,
        `- IP: ${evidencia.ip}`,
        `- Navegador: ${evidencia.navegador}`,
        `- Canal: ${evidencia.canal}`,
        `- Consentimiento comercial: ${evidencia.comercial ? "sí" : "no"}`,
        ...(registro ? [`- Evidencia: ${registro}`] : []),
        "",
        "Contactar al cliente para el pago y crear su usuario.",
    ].join("\n");

    try {
        const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass: pass.replace(/\s+/g, "") } });
        await transport.sendMail({
            from: `Midaz <${user}>`,
            to: process.env.ALTA_TO || "soporte@midazve.com",
            replyTo: data.email,
            subject: `Alta Midaz: ${data.company} · ${data.plan}`,
            text,
        });
    } catch (e) {
        console.error("Gmail falló", e && e.message);
        return res.status(502).json({ ok: false, error: "envio" });
    }
    return res.status(200).json({ ok: true });
}

// Envía el prospecto y su aceptación al Hub (POST /public/legal/prospects, llave en x-site-key).
// Devuelve una línea para el correo. Nunca escribe la llave en el log.
async function guardarEnHub(data, perfil, evidencia) {
    const url = (process.env.HUB_LEGAL_URL || "").trim();
    const key = (process.env.LEGAL_SITE_KEY || "").trim();
    if (!url || !key) return "";
    const body = {
        nombre: data.name,
        correo: data.email,
        empresa: data.company,
        rif: data.rif,
        telefono: data.phone,
        interes: data.plan,
        mensaje: perfil.join("\n").slice(0, 2000),
        documentos: evidencia.documentos.map(({ doc, version, sha256 }) => ({ documento: doc, version, sha256 })),
        marketing: evidencia.comercial,
        ip: evidencia.ip.slice(0, 64),
        userAgent: evidencia.navegador.slice(0, 500),
    };
    try {
        const r = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-site-key": key },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(8000),
        });
        const res = await r.json().catch(() => ({}));
        if (r.ok) {
            return `guardada en el Hub (${res.evidenceCount ?? "?"} registros${res.versionVerified === false ? ", versión sin verificar" : ""})`;
        }
        console.error("Hub rechazó la evidencia", r.status, res && res.code);
        return `el Hub respondió ${r.status}${res && res.code ? ` ${res.code}` : ""}; no quedó guardada`;
    } catch (e) {
        console.error("Hub no respondió", e && e.name);
        return "el Hub no respondió; no quedó guardada";
    }
}

// IP del cliente según los encabezados de Vercel: el primer valor de x-forwarded-for es el cliente.
function clientIp(req) {
    const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
    return clean(fwd || req.headers["x-real-ip"] || (req.socket && req.socket.remoteAddress) || "(desconocida)");
}

function safeJson(s) {
    try {
        return JSON.parse(s);
    } catch {
        return {};
    }
}
