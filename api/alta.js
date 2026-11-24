// Función de Vercel: recibe la solicitud de /comenzar (demo o alta, con el plan y su cotización) y la envía por correo
// a soporte desde una cuenta de Gmail.
// Variables en Vercel: GMAIL_USER y GMAIL_APP_PASSWORD (contraseña de aplicación de Google, no la normal),
// y ALTA_TO (destinatario, por defecto soporte@midazve.com).
// Opcional: EVIDENCIA_URL (y EVIDENCIA_TOKEN) para enviar la evidencia de aceptación al registro inalterable de Midaz
// cuando exista. Mientras no esté definida, la evidencia viaja solo en el correo (Guía de Implementación, secciones 3 y 4).
import nodemailer from "nodemailer";
import { acceptedDocuments } from "../src/data/legal.mjs";

const FIELDS = {
    name: "Nombre",
    company: "Comercio",
    rif: "Cédula o RIF",
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

    // Respuestas de solo tocar sobre el negocio ("Pregunta: respuesta") y líneas de la cotización del plan.
    const perfil = (Array.isArray(body.perfil) ? body.perfil : []).slice(0, 16).map(clean).filter(Boolean);
    const cotizacion = (Array.isArray(body.cotizacion) ? body.cotizacion : []).slice(0, 10).map(clean).filter(Boolean);
    // Qué pidió el cliente: ver una demo con un asesor (por defecto) o activar su plan.
    const demo = body.modalidad !== "activar";

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return res.status(503).json({ ok: false, error: "sin-configurar" });

    // Registro inalterable de evidencias (cuando Midaz lo tenga): recibe los mismos datos que el correo.
    let registro = "";
    if (process.env.EVIDENCIA_URL) {
        try {
            const r = await fetch(process.env.EVIDENCIA_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(process.env.EVIDENCIA_TOKEN && { Authorization: `Bearer ${process.env.EVIDENCIA_TOKEN}` }),
                },
                body: JSON.stringify({ cliente: data, ...evidencia }),
            });
            registro = r.ok ? "guardada en el registro de evidencias" : `el registro de evidencias respondió ${r.status}`;
        } catch (e) {
            console.error("Registro de evidencias falló", e && e.message);
            registro = "no se pudo guardar en el registro de evidencias";
        }
    }

    const text = [
        demo ? "Solicitud de demo de Midaz" : "Nueva solicitud de alta en Midaz",
        "",
        `Quiere: ${demo ? "ver una demo con un asesor" : "activar su plan"}`,
        "",
        ...Object.entries(FIELDS).map(([k, label]) => `- ${label}: ${data[k]}`),
        ...(cotizacion.length ? ["", "Cotización", ...cotizacion.map((l) => `- ${l}`)] : []),
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
        demo ? "Contactar al cliente para coordinar la demo." : "Contactar al cliente para el pago y crear su usuario.",
    ].join("\n");

    try {
        const transport = nodemailer.createTransport({ service: "gmail", auth: { user, pass: pass.replace(/\s+/g, "") } });
        await transport.sendMail({
            from: `Midaz <${user}>`,
            to: process.env.ALTA_TO || "soporte@midazve.com",
            replyTo: data.email,
            subject: `${demo ? "Demo" : "Alta"} Midaz: ${data.company} · ${data.plan}`,
            text,
        });
    } catch (e) {
        console.error("Gmail falló", e && e.message);
        return res.status(502).json({ ok: false, error: "envio" });
    }
    return res.status(200).json({ ok: true });
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
