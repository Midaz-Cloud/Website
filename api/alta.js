// Función de Vercel: recibe la solicitud de alta de /comenzar y la envía por correo a soporte desde una cuenta de Gmail.
// Variables en Vercel: GMAIL_USER y GMAIL_APP_PASSWORD (contraseña de aplicación de Google, no la normal),
// y ALTA_TO (destinatario, por defecto soporte@midazve.com).
import nodemailer from "nodemailer";

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

    // Respuestas de solo tocar sobre el negocio ("Pregunta: respuesta").
    const perfil = (Array.isArray(body.perfil) ? body.perfil : []).slice(0, 12).map(clean).filter(Boolean);

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) return res.status(503).json({ ok: false, error: "sin-configurar" });

    const text = [
        "Nueva solicitud de alta en Midaz",
        "",
        ...Object.entries(FIELDS).map(([k, label]) => `- ${label}: ${data[k]}`),
        ...(perfil.length ? ["", "Negocio", ...perfil.map((l) => `- ${l}`)] : []),
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

function safeJson(s) {
    try {
        return JSON.parse(s);
    } catch {
        return {};
    }
}
