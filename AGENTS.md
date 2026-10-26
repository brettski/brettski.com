# brettski.com

Astro static site (Tailwind v4, Pagefind search) on Cloudflare. See `README.md` for layout, how to add posts, design and deploy details.

## Development

- `npm run dev` builds a throwaway search index into `.dev-index/`, then starts the dev server in the foreground. Posts added or edited later are not searchable until it is restarted.
- Agents should not hold a terminal: run `npm run index:dev && astro dev --background`, and manage the server with `npx astro dev stop`, `astro dev status` and `astro dev logs`.
- Astro 7 allows one dev server per project. If `npm run dev` fails with "Another astro dev server is already running", run `npx astro dev stop`.
- Verify a change with `npm run lint && npm run check && npm test && npm run build`. To exercise headers, redirects and the CSP, build and serve `dist/` with `npx wrangler dev` (`npm run preview`).
- When stopping servers, confirm with `lsof -nP -iTCP:4321 -iTCP:8787 -sTCP:LISTEN`. A `pgrep` pattern can silently miss the real command line.

## Rules for this project

- **CSP is strict** (`public/_headers`): no inline `<script>`, no `<style>` blocks, no third-party scripts, fonts, images or stylesheets. Inline `style=""` attributes are allowed on purpose. Scripts that must run before paint go in `public/` as external files (see `theme-init.js`). Check any UI change in a browser for CSP violations.
- Posts live in `src/content/blog/<slug>.md` (filename is the URL slug); images in `public/images/blog/`. The schema in `src/content.config.ts` rejects bad front matter.
- Pure logic goes in `src/lib/` with a `*.test.ts` beside it. Build-time scripts go in `scripts/`, dev-only Astro integrations in `integrations/`.
- Tailwind only generates classes it can see as complete strings, so never build class names dynamically (see `src/lib/tagColor.ts`).
- Colors come from the `--color-accent-*` tokens in `src/styles/global.css`; dark mode follows `<html data-theme>`.

## Documentation

Full documentation: https://docs.astro.build

- [Routing](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styles and Tailwind](https://docs.astro.build/en/guides/styling/)
