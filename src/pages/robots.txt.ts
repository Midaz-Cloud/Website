import type { APIRoute } from "astro";

// Los despliegues de vista previa de Vercel no se indexan.
const isPreview = process.env.VERCEL_ENV === "preview";

// Rastreadores que juntan contenido para ENTRENAR modelos de IA (2026-11-11, pedido de Keiver: que una IA no
// copie la app). Los buscadores normales y los lectores de asistentes que entran cuando una persona pregunta
// (OAI-SearchBot, ChatGPT-User, Claude-User, PerplexityBot) siguen permitidos: es el sitio de marketing.
const AI_TRAINING_BOTS = [
    "GPTBot",
    "ClaudeBot",
    "anthropic-ai",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "meta-externalagent",
    "FacebookBot",
    "Amazonbot",
    "cohere-ai",
    "cohere-training-data-crawler",
    "Diffbot",
    "AI2Bot",
    "Omgilibot",
    "ImagesiftBot",
    "PetalBot",
    "Timpibot",
];

const aiBlock = AI_TRAINING_BOTS.map((bot) => `User-agent: ${bot}\nDisallow: /\n`).join("\n");

export const GET: APIRoute = ({ site }) => {
    const body = isPreview
        ? "User-agent: *\nDisallow: /\n"
        : `${aiBlock}\nUser-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`;
    return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
