import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Dominio de producción. Se puede sobrescribir con SITE_URL (p. ej. en un entorno de QA).
  site: process.env.SITE_URL || 'https://midazlatam.com',
  // Rutas viejas de los documentos legales. En Vercel las resuelve vercel.json con una redirección 308;
  // estas páginas de respaldo cubren cualquier otro hosting estático.
  redirects: {
    '/terminos': '/legal/terminos',
    '/privacidad': '/legal/privacidad',
    '/politicas': '/legal/politicas',
  },
  integrations: [
    react({
      include: ['**/react/*'],
    }),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  },
});
