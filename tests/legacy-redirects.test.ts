import { existsSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { LEGACY_REDIRECTS } from '../src/lib/legacy-redirects';

describe('LEGACY_REDIRECTS', () => {
  it('has at least one entry', () => {
    expect(LEGACY_REDIRECTS.length).toBeGreaterThan(0);
  });

  it.each(LEGACY_REDIRECTS.map((r) => [r.to, r] as const))(
    '%s points at an existing post',
    (_to, r) => {
      const slug = r.to.replace(/^\/blog\//, '').replace(/\/$/, '');
      expect(r.to).toMatch(/^\/blog\/[a-z0-9]+(?:-[a-z0-9]+)*\/$/);
      expect(existsSync(`src/content/blog/${slug}.md`)).toBe(true);
    },
  );

  it('uses old WordPress paths: /YYYY/MM/DD/<slug>/ with lowercase percent-encoding', () => {
    for (const { from } of LEGACY_REDIRECTS) {
      expect(from).toMatch(/^\/\d{4}\/\d{2}\/\d{2}\/[^/]+\/$/);
      // lowercase percent-encoding only (uppercase twins are generated); digits-only escapes like %80 are fine
      expect(from).toBe(from.replace(/%[0-9a-f]{2}/gi, (m) => m.toLowerCase()));
      expect(from).not.toMatch(/:[A-Za-z]|\*/); // must stay a static rule
    }
  });

  it('only lists URLs the generic year rule would get wrong', () => {
    // the generic rule redirects /YYYY/MM/DD/<old-slug>/ to /blog/<old-slug>/
    for (const { from, to } of LEGACY_REDIRECTS) {
      const oldSlug = from.split('/')[4];
      expect(`/blog/${oldSlug}/`).not.toBe(to);
    }
  });

  it('has unique sources', () => {
    const froms = LEGACY_REDIRECTS.map((r) => r.from);
    expect(new Set(froms).size).toBe(froms.length);
  });
});
