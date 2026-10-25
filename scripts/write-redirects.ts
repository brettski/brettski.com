/**
 * Post-build step: writes dist/_redirects from the archive pages Astro just built.
 * (Astro won't emit underscore-prefixed routes, so this can't be an endpoint.)
 *
 *   npx tsx scripts/write-redirects.ts
 */
import { readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { buildRedirects } from '../src/lib/redirects';

const ARCHIVE = 'dist/blog/archive';
const dirs = (path: string, pattern: RegExp) =>
  readdirSync(path, { withFileTypes: true })
    .filter((e) => e.isDirectory() && pattern.test(e.name))
    .map((e) => Number(e.name))
    .sort((a, b) => a - b);

const archive = dirs(ARCHIVE, /^\d{4}$/).map((year) => ({
  year,
  months: dirs(join(ARCHIVE, String(year)), /^\d{2}$/),
}));
if (archive.length === 0)
  throw new Error(
    `no archive pages found in ${ARCHIVE}; run astro build first`,
  );

writeFileSync('dist/_redirects', buildRedirects(archive));
console.log(`wrote dist/_redirects (${archive.length} years)`);
