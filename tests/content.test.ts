import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIR = 'src/content/blog';
const files = readdirSync(DIR).filter((f) => f.endsWith('.md'));

describe('blog content', () => {
  it('has posts', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it('contains no active-content HTML', () => {
    const banned =
      /<\s*(script|iframe|object|embed|form)\b|<[^>\n]*\son[a-z]+\s*=|(?:href|src)\s*=\s*["']?\s*javascript:/i;
    const offenders = files.filter((f) =>
      banned.test(readFileSync(join(DIR, f), 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('references no insecure or external images', () => {
    const external = /(?:!\[[^\]]*\]\(|<img[^>]*\ssrc=["'])https?:\/\//i;
    const offenders = files.filter((f) =>
      external.test(readFileSync(join(DIR, f), 'utf8')),
    );
    expect(offenders).toEqual([]);
  });

  it('uses URL-safe filenames that do not shadow reserved blog routes', () => {
    for (const f of files) {
      expect(f).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/);
      expect(['archive.md', 'tags.md', 'page.md']).not.toContain(f);
    }
  });
});
