import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts } from '../lib/content';
import { postUrl } from '../lib/urls';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).slice(0, 20);
  return rss({
    title: 'brettski.com',
    description: 'Brett Slaski: software, life and nerdiness.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.title,
      pubDate: p.date,
      link: postUrl(p.slug),
      description: p.entry.data.description,
    })),
  });
}
