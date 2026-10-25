import { monthUrl, yearUrl } from './urls';

export interface ArchiveMonths {
  year: number;
  months: number[];
}

/**
 * Cloudflare `_redirects` content for legacy WordPress URLs. blog.brettski.com/* is
 * redirected to brettski.com/* (path preserved) by a Cloudflare redirect rule, so these
 * match the old WordPress paths at the site root.
 */
export function buildRedirects(archive: ArchiveMonths[]): string {
  const rules = [
    '/category/:name/ /blog/tags/:name/ 301',
    '/tag/:name/ /blog/tags/:name/ 301',
  ];
  for (const { year, months } of archive) {
    // One rule per year: a generic /:y/:m/:d/:slug/ would also match /blog/archive/<y>/<m>/.
    rules.push(`/${year}/:month/:day/:slug/ /blog/:slug/ 301`);
    rules.push(`/${year}/ ${yearUrl(year)} 301`);
    for (const month of months)
      rules.push(
        `/${year}/${String(month).padStart(2, '0')}/ ${monthUrl(year, month)} 301`,
      );
  }
  return rules.join('\n') + '\n';
}
