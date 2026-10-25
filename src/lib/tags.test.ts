import { describe, expect, it } from 'vitest';
import { countTags, withTag } from './tags';

const posts = [
  { tags: ['b', 'a'] },
  { tags: ['a'] },
  { tags: [] },
  { tags: ['c', 'b'] },
];

describe('countTags', () => {
  it('sorts by count desc then name', () => {
    expect(countTags(posts)).toEqual([
      { tag: 'a', count: 2 },
      { tag: 'b', count: 2 },
      { tag: 'c', count: 1 },
    ]);
  });
});

describe('withTag', () => {
  it('filters posts by tag', () => {
    expect(withTag(posts, 'b')).toHaveLength(2);
    expect(withTag(posts, 'zzz')).toHaveLength(0);
  });
});
