import { getCollection, type CollectionEntry } from 'astro:content';
import { filterPublished, sortByDateDesc } from './posts';

export interface Post {
  slug: string;
  title: string;
  date: Date;
  tags: string[];
  draft: boolean;
  entry: CollectionEntry<'blog'>;
}

/** All posts, newest first. Drafts are included in dev only. */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('blog');
  const posts = entries.map((entry) => ({
    slug: entry.id,
    ...entry.data,
    entry,
  }));
  return sortByDateDesc(filterPublished(posts, import.meta.env.PROD));
}
