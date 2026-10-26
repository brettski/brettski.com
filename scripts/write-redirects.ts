/**
 * Post-build step: writes dist/_redirects from the archive pages Astro just built.
 * (Astro won't emit underscore-prefixed routes, so this can't be an endpoint.)
 *
 *   npx tsx scripts/write-redirects.ts
 */
import { writeFileSync } from 'node:fs';
import { buildRedirects } from '../src/lib/redirects';
import { readBuiltArchive } from './lib/built-archive';

const archive = readBuiltArchive('dist/blog/archive');

writeFileSync('dist/_redirects', buildRedirects(archive));
console.log(`wrote dist/_redirects (${archive.length} years)`);
