import { LEGACY_REDIRECTS, type LegacyRedirect } from './legacy-redirects';
import { monthUrl, yearUrl } from './urls';

export interface ArchiveMonths {
  year: number;
  months: number[];
}

/** Cloudflare's limits for a Workers static assets `_redirects` file. */
export const MAX_STATIC_REDIRECTS = 2000;
export const MAX_DYNAMIC_REDIRECTS = 100;

/** A source with a splat (`*`) or a placeholder (`:name`) is a dynamic rule. */
const DYNAMIC_SOURCE = /\*|:[A-Za-z]\w*/;

/** `%e2%80%94` -> `%E2%80%94`. Rule matching is case-sensitive on the hex digits. */
export const uppercasePercentEncoding = (path: string): string =>
  path.replace(/%[0-9a-f]{2}/gi, (m) => m.toUpperCase());

/**
 * One rule per legacy redirect, plus an uppercase-hex twin when the path is percent-encoded:
 * the old blog serves lowercase, but a client or redirect may send `%E2%80%94`, which would
 * otherwise fall through to the generic rule and land on a 404.
 */
export function legacyRules(legacy: LegacyRedirect[]): string[] {
  const rules: string[] = [];
  for (const { from, to } of legacy) {
    rules.push(`${from} ${to} 301`);
    const upper = uppercasePercentEncoding(from);
    if (upper !== from) rules.push(`${upper} ${to} 301`);
  }
  return rules;
}

/**
 * Cloudflare `_redirects` content for legacy WordPress URLs. blog.brettski.com/* is
 * redirected to brettski.com/* (path preserved) by a Cloudflare redirect rule, so these
 * match the old WordPress paths at the site root.
 *
 * Static rules come first on purpose: Cloudflare counts every rule after the first
 * placeholder/splat rule as dynamic (limit 100), even a plain one.
 */
export function buildRedirects(
  archive: ArchiveMonths[],
  legacy: LegacyRedirect[] = LEGACY_REDIRECTS,
): string {
  const staticRules: string[] = legacyRules(legacy);
  const dynamicRules = [
    '/category/:name/ /blog/tags/:name/ 301',
    '/tag/:name/ /blog/tags/:name/ 301',
  ];
  for (const { year, months } of archive) {
    // One rule per year: a generic /:y/:m/:d/:slug/ would also match /blog/archive/<y>/<m>/.
    dynamicRules.push(`/${year}/:month/:day/:slug/ /blog/:slug/ 301`);
    staticRules.push(`/${year}/ ${yearUrl(year)} 301`);
    for (const month of months)
      staticRules.push(
        `/${year}/${String(month).padStart(2, '0')}/ ${monthUrl(year, month)} 301`,
      );
  }
  return [...staticRules, ...dynamicRules].join('\n') + '\n';
}

export interface RuleCounts {
  static: number;
  dynamic: number;
}

/**
 * Counts rules the way Cloudflare does (Wrangler's `parseRedirects`): once a rule with a
 * placeholder or splat appears, every later rule counts as dynamic.
 */
export function countRedirectRules(content: string): RuleCounts {
  const counts: RuleCounts = { static: 0, dynamic: 0 };
  let canBeStatic = true;
  for (const raw of content.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const source = line.split(/\s+/)[0];
    if (canBeStatic && !DYNAMIC_SOURCE.test(source)) {
      counts.static++;
    } else {
      counts.dynamic++;
      canBeStatic = false;
    }
  }
  return counts;
}

/** Throws if Cloudflare would reject the file. Returns the counts when it fits. */
export function assertRedirectLimits(content: string): RuleCounts {
  const counts = countRedirectRules(content);
  if (counts.dynamic > MAX_DYNAMIC_REDIRECTS) {
    throw new Error(
      `_redirects has ${counts.dynamic} dynamic rules (limit ${MAX_DYNAMIC_REDIRECTS}). ` +
        'Rules after the first placeholder/splat rule count as dynamic, so keep static rules first.',
    );
  }
  if (counts.static > MAX_STATIC_REDIRECTS) {
    throw new Error(
      `_redirects has ${counts.static} static rules (limit ${MAX_STATIC_REDIRECTS}).`,
    );
  }
  return counts;
}
