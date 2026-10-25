// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://brettski.com',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  build: {
    // Never inline CSS/JS so the CSP can forbid inline code.
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
