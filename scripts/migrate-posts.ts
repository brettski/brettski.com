/**
 * One-time migration: blog/posts/*.md (WordPress export) -> src/content/blog/<slug>.md
 *
 *   npx tsx scripts/migrate-posts.ts
 *
 * - merges `categories` + `tags` into a single lowercase, de-duplicated `tags`
 * - drops `slug` (the filename is the slug) and `layout`
 * - copies images to public/images/blog (raw HTML <img> in posts can't use Astro's asset pipeline)
 * - removes dead Amazon affiliate tracking pixels
 * - reports image references that point to files that don't exist
 */
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { basename, join } from 'node:path';
import matter from 'gray-matter';

const SRC = 'blog/posts';
const OUT = 'src/content/blog';
const IMG_SRC = join(SRC, 'images');
const IMG_OUT = 'public/images/blog';
const IMG_URL = '/images/blog/';
const DROPPED_TAGS = new Set(['uncategorized']);
// Posts whose WordPress slug has no URL-safe characters at all (the SOPA blackout post).
const RENAMES: Record<string, string> = {
  '██████████████████████': 'sopa-blackout',
};

const urlSafe = (s: string) =>
  s
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
mkdirSync(IMG_OUT, { recursive: true });

for (const file of readdirSync(IMG_SRC))
  copyFileSync(join(IMG_SRC, file), join(IMG_OUT, file));

const trackingPixel =
  /!\[[^\]]*\]\(https?:\/\/(?:www\.)?assoc-amazon\.com\/[^)]*\)|<img[^>]*assoc-amazon\.com[^>]*>/gi;
const mdLocalImage = /(!\[[^\]]*\]\()images\/([^)\s]+)(\))/g;

const missing: string[] = [];
const renamed: string[] = [];
const seen = new Set<string>();
let count = 0;

for (const file of readdirSync(SRC).filter((f) => f.endsWith('.md'))) {
  const { data, content } = matter(readFileSync(join(SRC, file), 'utf8'));
  const original = basename(file, '.md');
  if (data.slug !== original)
    throw new Error(`${file}: slug "${data.slug}" does not match filename`);
  const slug = RENAMES[original] ?? urlSafe(original);
  if (!slug) throw new Error(`${file}: no URL-safe slug; add it to RENAMES`);
  if (seen.has(slug)) throw new Error(`${file}: duplicate slug "${slug}"`);
  seen.add(slug);
  if (slug !== original) renamed.push(`${original} -> ${slug}`);

  const tags = [
    ...new Set(
      [...(data.categories ?? []), ...(data.tags ?? [])].map((t: string) =>
        t.toLowerCase(),
      ),
    ),
  ].filter((t) => !DROPPED_TAGS.has(t));

  const body = content
    .replace(trackingPixel, '')
    .replace(mdLocalImage, `$1${IMG_URL}$2$3`);

  for (const m of body.matchAll(
    /(?:src="|\]\()(\/images\/blog\/[^"')\s]*|images\/[^"')\s]*)/g,
  )) {
    const name = basename(m[1]);
    if (!name || !existsSync(join(IMG_OUT, name)))
      missing.push(`${slug}: ${m[1]}`);
  }

  const out = matter.stringify(body.trimStart(), {
    title: data.title,
    date: data.date,
    tags,
    draft: false,
  });
  writeFileSync(join(OUT, `${slug}.md`), out);
  count++;
}

console.log(
  `migrated ${count} posts, copied ${readdirSync(IMG_OUT).length} images`,
);
if (renamed.length) console.log(`renamed slugs:\n  ${renamed.join('\n  ')}`);
if (missing.length) console.log(`missing images:\n  ${missing.join('\n  ')}`);
