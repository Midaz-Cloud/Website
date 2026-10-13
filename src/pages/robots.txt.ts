import type { APIRoute } from "astro";

// Los despliegues de vista previa de Vercel no se indexan.
const isPreview = process.env.VERCEL_ENV === "preview";

export const GET: APIRoute = ({ site }) => {
    const body = isPreview
        ? "User-agent: *\nDisallow: /\n"
        : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`;
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
