import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, normalize, resolve, sep } from 'node:path';

const TYPES = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.wasm': 'application/wasm',
};

/**
 * Maps a request path to a file under `root`. Returns null for anything that
 * would resolve outside it.
 * @param {string} root
 * @param {string} urlPath
 * @returns {string | null}
 */
export function resolveAsset(root, urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath.split('?')[0]);
  } catch {
    return null;
  }
  if (decoded.includes('\0')) return null;
  const base = resolve(root);
  const file = resolve(base, '.' + normalize('/' + decoded));
  return file.startsWith(base + sep) ? file : null;
}

/**
 * Dev only: serves the Pagefind index built by `npm run dev` at /pagefind/.
 * Production builds generate the index into dist/pagefind instead.
 * @param {{ dir?: string }} [options]
 * @returns {import('astro').AstroIntegration}
 */
export default function devPagefind({ dir = '.dev-index/pagefind' } = {}) {
  return {
    name: 'dev-pagefind',
    hooks: {
      'astro:server:setup': ({ server, logger }) => {
        if (!existsSync(dir)) {
          logger.warn(
            'No search index found; start the server with `npm run dev` to build one.',
          );
        }
        server.middlewares.use('/pagefind', (req, res, next) => {
          const file = resolveAsset(dir, req.url ?? '/');
          if (!file || !existsSync(file) || !statSync(file).isFile())
            return next();
          res.setHeader(
            'Content-Type',
            TYPES[extname(file)] ?? 'application/octet-stream',
          );
          createReadStream(file).pipe(res);
        });
      },
    },
  };
}
