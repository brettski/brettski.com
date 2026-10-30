/**
 * Post-build step: writes dist/_redirects from the archive pages Astro just built.
 * (Astro won't emit underscore-prefixed routes, so this can't be an endpoint.)
 *
 *   npx tsx scripts/write-redirects.ts
 */
import { writeFileSync } from 'node:fs';
import { assertRedirectLimits, buildRedirects } from '../src/lib/redirects';
import { readBuiltArchive } from './lib/built-archive';

const archive = readBuiltArchive('dist/blog/archive');
const content = buildRedirects(archive);

// Cloudflare rejects the whole deploy if the file breaks its limits, so fail the build instead.
const counts = assertRedirectLimits(content);

writeFileSync('dist/_redirects', content);
console.log(
  `wrote dist/_redirects (${counts.static} static, ${counts.dynamic} dynamic rules, ${archive.length} years)`,
);
