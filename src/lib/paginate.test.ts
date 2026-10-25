import { describe, expect, it } from 'vitest';
import { paginate } from './paginate';

const items = [1, 2, 3, 4, 5];

describe('paginate', () => {
  it('slices pages', () => {
    expect(paginate(items, 1, 2)).toEqual({
      items: [1, 2],
      page: 1,
      totalPages: 3,
    });
    expect(paginate(items, 3, 2).items).toEqual([5]);
  });
  it('has one page when empty', () => {
    expect(paginate([], 1, 10)).toEqual({ items: [], page: 1, totalPages: 1 });
  });
  it('rejects out-of-range pages', () => {
    expect(() => paginate(items, 0, 2)).toThrow(RangeError);
    expect(() => paginate(items, 4, 2)).toThrow(RangeError);
    expect(() => paginate(items, 1.5, 2)).toThrow(RangeError);
  });
});
