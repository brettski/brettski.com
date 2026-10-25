import { describe, expect, it } from 'vitest';
import { buildArchive, inMonth, inYear } from './archive';

const d = (iso: string) => ({ date: new Date(iso) });
const posts = [
  d('2008-01-05T00:00:00Z'),
  d('2007-12-31T23:59:59Z'),
  d('2008-01-20T10:00:00Z'),
  d('2008-03-01T00:00:00Z'),
];

describe('buildArchive', () => {
  it('groups by year and month, newest first', () => {
    expect(buildArchive(posts)).toEqual([
      {
        year: 2008,
        count: 3,
        months: [
          { month: 3, count: 1 },
          { month: 1, count: 2 },
        ],
      },
      { year: 2007, count: 1, months: [{ month: 12, count: 1 }] },
    ]);
  });
  it('uses UTC at year boundaries', () => {
    expect(buildArchive([d('2008-01-01T00:00:00Z')])[0].year).toBe(2008);
  });
  it('handles no posts', () => {
    expect(buildArchive([])).toEqual([]);
  });
});

describe('inYear / inMonth', () => {
  it('filters', () => {
    expect(inYear(posts, 2008)).toHaveLength(3);
    expect(inMonth(posts, 2008, 1)).toHaveLength(2);
    expect(inMonth(posts, 2008, 2)).toHaveLength(0);
  });
});
