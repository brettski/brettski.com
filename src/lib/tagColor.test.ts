import { describe, expect, it } from 'vitest';
import { TAG_COLORS, hashTag, tagColor } from './tagColor';

describe('tagColor', () => {
  it('is stable for the same tag', () => {
    expect(tagColor('programming')).toBe(tagColor('programming'));
    expect(hashTag('life')).toBe(hashTag('life'));
  });

  it('always returns one of the palette entries', () => {
    for (const tag of ['', 'a', 'that-poop-is-cold', 'macbook-pro', '日本語']) {
      expect(TAG_COLORS).toContain(tagColor(tag));
    }
  });

  it('spreads tags across the palette', () => {
    const tags = Array.from({ length: 60 }, (_, i) => `tag-${i}`);
    const used = new Set(tags.map(tagColor));
    expect(used.size).toBe(TAG_COLORS.length);
  });

  it('gives every entry light and dark variants and a hover state', () => {
    for (const c of TAG_COLORS) {
      expect(c).toMatch(/\bbg-\w+-\d+\b/);
      expect(c).toMatch(/\btext-\w+-\d+\b/);
      expect(c).toMatch(/\bhover:bg-/);
      expect(c).toMatch(/\bdark:bg-/);
      expect(c).toMatch(/\bdark:text-/);
    }
  });

  it('keeps each entry within a single hue', () => {
    for (const c of TAG_COLORS) {
      const hues = new Set(
        [...c.matchAll(/(?:bg|text)-([a-z]+)-\d+/g)].map((m) => m[1]),
      );
      expect(hues.size).toBe(1);
    }
  });
});
