import { describe, expect, it } from 'vitest';
import {
  MAX_DYNAMIC_REDIRECTS,
  assertRedirectLimits,
  buildRedirects,
  countRedirectRules,
} from './redirects';

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
  it('puts every static rule before the first dynamic rule', () => {
    const firstDynamic = lines.findIndex((l) =>
      /:[A-Za-z]/.test(l.split(' ')[0]),
    );
    expect(firstDynamic).toBeGreaterThan(0);
    for (const l of lines.slice(0, firstDynamic))
      expect(l.split(' ')[0]).not.toMatch(/:[A-Za-z]|\*/);
    for (const l of lines.slice(firstDynamic))
      expect(l.split(' ')[0]).toMatch(/:[A-Za-z]/);
  });
});

describe('Cloudflare rule limits', () => {
  const full = Array.from({ length: 14 }, (_, i) => ({
    year: 2007 + i,
    months: Array.from({ length: 12 }, (_, m) => m + 1),
  }));

  it('counts the real shape of our output as static + dynamic', () => {
    const counts = countRedirectRules(buildRedirects(full));
    expect(counts).toEqual({ static: 14 + 14 * 12, dynamic: 2 + 14 });
  });

  it('passes for a full 14-year, every-month archive', () => {
    expect(() => assertRedirectLimits(buildRedirects(full))).not.toThrow();
  });

  it('counts every rule after the first placeholder rule as dynamic', () => {
    const content = '/a/:x/ /b/:x/ 301\n/c/ /d/ 301\n/e/ /f/ 301\n';
    expect(countRedirectRules(content)).toEqual({ static: 0, dynamic: 3 });
  });

  it('rejects the old interleaved layout that Cloudflare refused at deploy', () => {
    // placeholder rules first, then 100+ plain rules: all counted as dynamic
    const staticRules = Array.from(
      { length: 101 },
      (_, i) => `/p${i}/ /q${i}/ 301`,
    );
    const bad = ['/tag/:name/ /blog/tags/:name/ 301', ...staticRules].join(
      '\n',
    );
    expect(countRedirectRules(bad).dynamic).toBe(102);
    expect(() => assertRedirectLimits(bad)).toThrow(/dynamic rules/);
    // the same rules in the right order are fine
    const good = [...staticRules, '/tag/:name/ /blog/tags/:name/ 301'].join(
      '\n',
    );
    expect(assertRedirectLimits(good)).toEqual({ static: 101, dynamic: 1 });
  });

  it('allows exactly the dynamic limit and rejects one more', () => {
    const rules = (n: number) =>
      Array.from({ length: n }, (_, i) => `/d${i}/:x/ /t/:x/ 301`).join('\n');
    expect(() =>
      assertRedirectLimits(rules(MAX_DYNAMIC_REDIRECTS)),
    ).not.toThrow();
    expect(() =>
      assertRedirectLimits(rules(MAX_DYNAMIC_REDIRECTS + 1)),
    ).toThrow();
  });

  it('ignores comments and blank lines', () => {
    expect(countRedirectRules('# note\n\n/a/ /b/ 301\n')).toEqual({
      static: 1,
      dynamic: 0,
    });
  });

  it('treats splats as dynamic', () => {
    expect(countRedirectRules('/a/* /b/:splat 301\n')).toEqual({
      static: 0,
      dynamic: 1,
    });
  });
});
