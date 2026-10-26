import { describe, expect, it } from 'vitest';
import { excerpt, postDescription } from './excerpt';

describe('postDescription', () => {
  it('prefers an explicit description', () => {
    expect(postDescription('Written by hand', 'Body text')).toBe(
      'Written by hand',
    );
  });
  it('falls back to the body excerpt', () => {
    expect(postDescription(undefined, 'Body **text**')).toBe('Body text');
    expect(postDescription('   ', 'Body text')).toBe('Body text');
  });
  it('is undefined when there is neither', () => {
    expect(postDescription(undefined, undefined)).toBeUndefined();
    expect(postDescription(undefined, '')).toBeUndefined();
  });
});

describe('excerpt', () => {
  it('returns short plain text unchanged', () => {
    expect(excerpt('Just a short post.')).toBe('Just a short post.');
  });

  it('keeps link text and drops the URL', () => {
    expect(excerpt('Read [the docs](https://example.com/docs) now.')).toBe(
      'Read the docs now.',
    );
  });

  it('drops images', () => {
    expect(excerpt('Before ![alt text](images/a.png) after')).toBe(
      'Before after',
    );
  });

  it('strips raw HTML tags but keeps their text', () => {
    expect(
      excerpt(
        '<table><tr><td>Brett</td><td>wrote this</td></tr></table>\n\nMore.',
      ),
    ).toBe('Brett wrote this More.');
  });

  it('drops fenced and indented code', () => {
    const md =
      'Intro\n\n```js\nconst secret = 1;\n```\n\n\tindented();\n\nOutro';
    expect(excerpt(md)).toBe('Intro Outro');
  });

  it('removes heading, list, quote and emphasis markers', () => {
    expect(excerpt('## Title\n\n- **bold** item\n> quoted `code`')).toBe(
      'Title bold item quoted code',
    );
  });

  it('removes nested block markers such as a quote inside a list item', () => {
    expect(excerpt('Intro:\n\n- > Quoted in a list\n> > Nested quote')).toBe(
      'Intro: Quoted in a list Nested quote',
    );
  });

  it('unescapes backslash escapes and decodes basic entities', () => {
    expect(excerpt('verifyBlog\\_click &amp; more')).toBe(
      'verifyBlog_click & more',
    );
  });

  it('returns undefined when nothing readable remains', () => {
    expect(excerpt('')).toBeUndefined();
    expect(excerpt('   \n\n  ')).toBeUndefined();
    expect(excerpt('![](a.png)\n\n```\ncode\n```')).toBeUndefined();
  });

  it('leaves text at exactly the limit untouched', () => {
    const text = 'a'.repeat(10);
    expect(excerpt(text, 10)).toBe(text);
  });

  it('truncates at a word boundary and stays within the limit', () => {
    const out = excerpt('one two three four five six seven', 20)!;
    expect(out).toBe('one two three four…');
    expect(Array.from(out).length).toBeLessThanOrEqual(20);
  });

  it('hard-cuts a single over-long word', () => {
    const out = excerpt('x'.repeat(50), 10)!;
    expect(out).toBe('x'.repeat(9) + '…');
  });

  it('does not leave trailing punctuation before the ellipsis', () => {
    expect(excerpt('alpha beta, gamma delta', 12)).toBe('alpha beta…');
  });

  it('never splits a surrogate pair', () => {
    const out = excerpt('😀'.repeat(30), 10)!;
    expect(Array.from(out)).toHaveLength(10);
    expect(out.endsWith('…')).toBe(true);
    expect(out).not.toMatch(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/);
  });
});
