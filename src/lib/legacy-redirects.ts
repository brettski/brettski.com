export interface LegacyRedirect {
  /** Old WordPress path exactly as blog.brettski.com serves it (lowercase percent-encoding). */
  from: string;
  /** New path on this site. */
  to: string;
}

/**
 * Old URLs the generic `/<year>/:month/:day/:slug/` rule can't map, because the new slug
 * differs from the old one (an em dash, an underscore, or block characters in the old slug).
 * Each `from` was requested on blog.brettski.com and returned 200.
 */
export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  {
    from: '/2008/09/09/comcast-%e2%80%94-here-we-go-again-day-3/',
    to: '/blog/comcast-here-we-go-again-day-3/',
  },
  {
    from: '/2008/09/10/comcast-%e2%80%94-here-we-go-again-day-4/',
    to: '/blog/comcast-here-we-go-again-day-4/',
  },
  {
    from: '/2008/09/11/comcast-%e2%80%94-here-we-go-again-day-5/',
    to: '/blog/comcast-here-we-go-again-day-5/',
  },
  {
    from: '/2008/09/12/comcast-%e2%80%94-here-we-go-again-day-6/',
    to: '/blog/comcast-here-we-go-again-day-6/',
  },
  {
    from: '/2009/12/03/accessing-web_dav-from-windows-xp/',
    to: '/blog/accessing-web-dav-from-windows-xp/',
  },
  {
    // the post's title and slug were 22 U+2588 blocks (the SOPA blackout post)
    from: `/2012/01/18/${'%e2%96%88'.repeat(22)}/`,
    to: '/blog/sopa-blackout/',
  },
];
