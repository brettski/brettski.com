export interface TagCount {
  tag: string;
  count: number;
}

/** Sorted by count (desc), then name. */
export function countTags(posts: { tags: string[] }[]): TagCount[] {
  const counts = new Map<string, number>();
  for (const { tags } of posts)
    for (const tag of tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export const withTag = <T extends { tags: string[] }>(
  posts: T[],
  tag: string,
): T[] => posts.filter((p) => p.tags.includes(tag));
