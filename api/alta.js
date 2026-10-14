// Función de Vercel: recibe la solicitud de alta de /comenzar y la envía por correo a soporte con Resend.
// Variables en Vercel: RESEND_API_KEY (obligatoria), ALTA_FROM (remitente de un dominio verificado en Resend)
// y ALTA_TO (destinatario, por defecto soporte@midazve.com).

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

    const key = process.env.RESEND_API_KEY;
    if (!key) return res.status(503).json({ ok: false, error: "sin-configurar" });

    const text = [
        "Nueva solicitud de alta en Midaz",
        "",
        ...Object.entries(FIELDS).map(([k, label]) => `- ${label}: ${data[k]}`),
        "",
        "Contactar al cliente para el pago y crear su usuario.",
    ].join("\n");

    const r = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            from: process.env.ALTA_FROM || "Midaz <onboarding@resend.dev>",
            to: [process.env.ALTA_TO || "soporte@midazve.com"],
            reply_to: data.email,
            subject: `Alta Midaz: ${data.company} · ${data.plan}`,
            text,
        }),
    }).catch(() => null);

    if (!r || !r.ok) {
        console.error("Resend falló", r && r.status, r && (await r.text().catch(() => "")));
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
