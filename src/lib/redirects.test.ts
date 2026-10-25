import { describe, expect, it } from 'vitest';
import { buildRedirects } from './redirects';

describe('buildRedirects', () => {
  const out = buildRedirects([{ year: 2008, months: [3] }]);
  const lines = out.trim().split('\n');

  it('maps legacy post, category and tag URLs', () => {
    expect(lines).toContain('/2008/:month/:day/:slug/ /blog/:slug/ 301');
    expect(lines).toContain('/category/:name/ /blog/tags/:name/ 301');
    expect(lines).toContain('/tag/:name/ /blog/tags/:name/ 301');
  });
  it('maps legacy archive URLs to the new ones', () => {
    expect(lines).toContain('/2008/ /blog/archive/2008/ 301');
    expect(lines).toContain('/2008/03/ /blog/archive/2008/03/ 301');
  });
  it('never matches the new /blog/... URLs', () => {
    for (const l of lines) expect(l).not.toMatch(/^\/(:|blog)/);
  });
  it('emits only well-formed 301 rules', () => {
    for (const l of lines) expect(l).toMatch(/^\/\S* \/\S* 301$/);
  });
});
