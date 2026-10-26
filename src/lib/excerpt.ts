const ENTITIES: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};

/**
 * Plain-text summary of a Markdown post body for meta descriptions and feeds.
 * Drops code, raw HTML, images and Markdown syntax; keeps link text. Returns at most
 * `max` characters (counting the ellipsis), cut at a word boundary, or `undefined`
 * when the post has no readable text.
 */
export function excerpt(markdown: string, max = 160): string | undefined {
  const text = markdown
    .replace(/^(```|~~~)[^\n]*\n[\s\S]*?^\1[^\n]*$/gm, ' ') // fenced code
    .replace(/^(?: {4}|\t).*$/gm, ' ') // indented code
    .replace(/<!--[\s\S]*?-->/g, ' ') // HTML comments
    .replace(/<[^>]*>/g, ' ') // raw HTML tags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links -> their text
    .replace(/^\s{0,3}(?:#{1,6}\s+|>\s?|[-*+]\s+|\d+[.)]\s+)+/gm, '') // block markers (may nest)
    .replace(/\\([\\`*_{}[\]()#+\-.!|<>])/g, '$1') // backslash escapes
    .replace(/[*`]+/g, '') // emphasis and inline-code marks
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (e) => ENTITIES[e])
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return undefined;

  // Count code points so an emoji is never split.
  const chars = Array.from(text);
  if (chars.length <= max) return text;

  const head = chars.slice(0, max - 1).join('');
  const lastSpace = head.lastIndexOf(' ');
  const cut = lastSpace > max * 0.6 ? head.slice(0, lastSpace) : head;
  return cut.replace(/[\s.,;:!?-]+$/, '') + '…';
}

/** A front-matter `description` wins; otherwise summarize the body. */
export const postDescription = (
  explicit: string | undefined,
  body: string | undefined,
): string | undefined => explicit?.trim() || excerpt(body ?? '');
