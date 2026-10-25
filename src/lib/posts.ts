export interface Dated {
  date: Date;
}

export const sortByDateDesc = <T extends Dated>(posts: T[]): T[] =>
  [...posts].sort((a, b) => b.date.getTime() - a.date.getTime());

/** Drafts are visible in dev only. */
export const filterPublished = <T extends { draft: boolean }>(
  posts: T[],
  isProd: boolean,
): T[] => (isProd ? posts.filter((p) => !p.draft) : posts);

export const formatDate = (date: Date): string =>
  date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
