import { describe, expect, it } from 'vitest';
import { filterPublished, formatDate, sortByDateDesc } from './posts';
import { monthUrl, pageUrl, postUrl, tagUrl, yearUrl } from './urls';

describe('posts', () => {
  it('sorts newest first without mutating input', () => {
    const input = [
      { date: new Date('2007-01-01') },
      { date: new Date('2009-01-01') },
    ];
    expect(sortByDateDesc(input)[0].date.getUTCFullYear()).toBe(2009);
    expect(input[0].date.getUTCFullYear()).toBe(2007);
  });
  it('hides drafts only in production', () => {
    const input = [{ draft: true }, { draft: false }];
    expect(filterPublished(input, true)).toHaveLength(1);
    expect(filterPublished(input, false)).toHaveLength(2);
  });
  it('formats dates in UTC', () => {
    expect(formatDate(new Date('2017-06-04T03:35:20Z'))).toBe('June 4, 2017');
  });
});

describe('urls', () => {
  it('builds canonical paths', () => {
    expect(postUrl('a-b')).toBe('/blog/a-b/');
    expect(yearUrl(2008)).toBe('/blog/archive/2008/');
    expect(monthUrl(2008, 3)).toBe('/blog/archive/2008/03/');
    expect(tagUrl('life')).toBe('/blog/tags/life/');
    expect(pageUrl(1)).toBe('/blog/');
    expect(pageUrl(3)).toBe('/blog/page/3/');
  });
});
