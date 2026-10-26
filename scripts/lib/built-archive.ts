import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { ArchiveMonths } from '../../src/lib/redirects';

const numericDirs = (path: string, pattern: RegExp): number[] =>
  readdirSync(path, { withFileTypes: true })
    .filter((e) => e.isDirectory() && pattern.test(e.name))
    .map((e) => Number(e.name))
    .sort((a, b) => a - b);

/**
 * Reads the built archive pages (`<archiveDir>/<yyyy>/<mm>/`) into year/month lists,
 * oldest first. Anything that isn't a 4-digit year or 2-digit month directory is ignored.
 */
export function readBuiltArchive(archiveDir: string): ArchiveMonths[] {
  if (!existsSync(archiveDir)) {
    throw new Error(`${archiveDir} not found; run astro build first`);
  }
  const archive = numericDirs(archiveDir, /^\d{4}$/).map((year) => ({
    year,
    months: numericDirs(join(archiveDir, String(year)), /^\d{2}$/),
  }));
  if (archive.length === 0) {
    throw new Error(`no archive pages found in ${archiveDir}`);
  }
  return archive;
}
