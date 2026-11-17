// Documentos legales publicados en midazlatam.com/legal (Guía de Implementación de los Documentos Legales v1.0, sección 2).
//
// Reglas:
// - Una versión publicada no se modifica ni se borra. Un cambio es una versión nueva, con su propia URL fija
//   (/legal/<doc>/v2-1), que se agrega AL PRINCIPIO de `versions`. La primera de la lista es la vigente.
// - Para publicar una versión nueva: `python3 scripts/legal/importar.py <doc> <versión> <archivo.docx>` y copiar aquí
//   la huella que imprime. El build falla si la huella no coincide con public/legal/<doc>/<v>.txt.
// - `sha256` es la huella del texto plano publicado en /legal/<doc>/<v>.txt; api/alta.js la guarda como evidencia
//   de qué texto exacto aceptó el cliente.
//
// Este archivo es JavaScript plano para que lo puedan importar tanto las páginas de Astro como la función api/alta.js.

export const LEGAL_DOCS = {
    terminos: {
        title: "Términos y Condiciones",
        fullTitle: "Términos y Condiciones del Servicio Midaz",
        subtitle: "Planes Esencial y Negocio · Contratación en línea",
        versions: [
            {
                version: "2.0",
                slug: "v2-0",
                effective: "2026-11-16",
                effectiveText: "16 de noviembre de 2026",
                sha256: "4dea38b4ae8cf427f89b7e991affaff7d98b38d11aa7637085779a5c5d729dbd",
            },
        ],
    },
    politicas: {
        title: "Políticas de Servicio",
        fullTitle: "Políticas de Servicio Midaz",
        subtitle: "Parámetros operativos de los planes Esencial y Negocio",
        versions: [
            {
                version: "1.0",
                slug: "v1-0",
                effective: "2026-11-16",
                effectiveText: "16 de noviembre de 2026",
                sha256: "81ec94004dd842769189f7f50f9ae84252250bce8211ea187ebb4f6e55d469a6",
            },
        ],
    },
    privacidad: {
        title: "Política de Privacidad",
        fullTitle: "Política de Privacidad Midaz",
        subtitle: "Tratamiento de datos personales en la plataforma, el sitio web y los canales de atención",
        versions: [
            {
                version: "1.0",
                slug: "v1-0",
                effective: "2026-11-16",
                effectiveText: "16 de noviembre de 2026",
                sha256: "e70dcfc50e2246b4762e9ea5d5b7acf27b507940062b66a7e3bb5023cfa42876",
            },
        ],
    },
};

/** Orden en que se muestran y se aceptan. */
export const LEGAL_ORDER = ["terminos", "politicas", "privacidad"];

/** Versión vigente de un documento. */
export function currentVersion(doc) {
    return LEGAL_DOCS[doc].versions[0];
}

/** URL fija de una versión, p. ej. /legal/terminos/v2-0 */
export function versionUrl(doc, v) {
    return `/legal/${doc}/${v.slug}`;
}

/** Documentos y versiones que se aceptan hoy en el alta (lo que guarda api/alta.js). */
export function acceptedDocuments() {
    return LEGAL_ORDER.map((doc) => {
        const v = currentVersion(doc);
        return { doc, title: LEGAL_DOCS[doc].title, version: v.version, url: versionUrl(doc, v), sha256: v.sha256 };
    });
}
