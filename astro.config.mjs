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
  markdown: {
    // Class-based highlighting: Shiki emits inline style attributes, which the CSP forbids.
    syntaxHighlight: 'prism',
  },
  build: {
    // Never inline CSS/JS so the CSP can forbid inline code.
    inlineStylesheets: 'never',
  },
  vite: {
    plugins: [tailwindcss()],
    build: { assetsInlineLimit: 0 },
  },
});
