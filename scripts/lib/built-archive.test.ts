import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { readBuiltArchive } from './built-archive';

let root: string;
const mk = (...parts: string[]) =>
  mkdirSync(join(root, ...parts), { recursive: true });

beforeEach(() => {
  root = mkdtempSync(join(tmpdir(), 'built-archive-'));
});
afterEach(() => {
  rmSync(root, { recursive: true, force: true });
});

describe('readBuiltArchive', () => {
  it('lists years and months, oldest first', () => {
    mk('2008', '03');
    mk('2007', '12');
    mk('2007', '01');
    mk('2008', '01');
    expect(readBuiltArchive(root)).toEqual([
      { year: 2007, months: [1, 12] },
      { year: 2008, months: [1, 3] },
    ]);
  });

  it('ignores entries that are not 4-digit years or 2-digit months', () => {
    mk('2008', '03');
    mk('2008', 'x');
    mk('2008', '3');
    mk('page');
    mk('20080');
    writeFileSync(join(root, '2009'), 'a file, not a directory');
    writeFileSync(join(root, '2008', 'index.html'), '');
    expect(readBuiltArchive(root)).toEqual([{ year: 2008, months: [3] }]);
  });

  it('keeps a year that has no month pages', () => {
    mk('2010');
    expect(readBuiltArchive(root)).toEqual([{ year: 2010, months: [] }]);
  });

  it('throws when the directory does not exist', () => {
    expect(() => readBuiltArchive(join(root, 'missing'))).toThrow(
      /run astro build first/,
    );
  });

  it('throws when there are no year directories', () => {
    mk('page');
    expect(() => readBuiltArchive(root)).toThrow(/no archive pages/);
  });
});
