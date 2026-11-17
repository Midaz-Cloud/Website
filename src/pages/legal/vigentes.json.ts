import type { APIRoute } from "astro";
import { LEGAL_DOCS, LEGAL_ORDER, currentVersion, versionUrl } from "../../data/legal.mjs";

// Versiones vigentes de los documentos legales, para que la web, el Hub y Ágora las lean desde aquí sin copiarlas.
// Se genera del registro src/data/legal.mjs en cada build: publicar una versión nueva lo actualiza solo.
// `sha256` es la huella del texto plano (url_texto), la misma que api/alta.js guarda como evidencia de aceptación.
export const GET: APIRoute = ({ site }) => {
    const abs = (path: string) => new URL(path, site).toString();
    const documentos = LEGAL_ORDER.map((doc) => {
        const v = currentVersion(doc);
        const url = versionUrl(doc, v);
        return {
            documento: doc,
            titulo: LEGAL_DOCS[doc].title,
            version: v.version,
            fecha_vigencia: v.effective,
            sha256: v.sha256,
            url: abs(url),
            url_pdf: abs(`${url}.pdf`),
            url_texto: abs(`${url}.txt`),
        };
    });
    const body = JSON.stringify({ documentos }, null, 2) + "\n";
    return new Response(body, { headers: { "Content-Type": "application/json; charset=utf-8" } });
};
