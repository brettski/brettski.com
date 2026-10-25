const pad = (n: number) => String(n).padStart(2, '0');

export const postUrl = (slug: string) => `/blog/${slug}/`;
export const yearUrl = (year: number) => `/blog/archive/${year}/`;
export const monthUrl = (year: number, month: number) =>
  `/blog/archive/${year}/${pad(month)}/`;
export const tagUrl = (tag: string) => `/blog/tags/${tag}/`;
export const pageUrl = (page: number) =>
  page <= 1 ? '/blog/' : `/blog/page/${page}/`;
