import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveAsset } from '../integrations/dev-pagefind.mjs';

const root = resolve('.dev-index/pagefind');

describe('resolveAsset', () => {
  it('resolves files under the root', () => {
    expect(resolveAsset(root, '/pagefind.js')).toBe(
      resolve(root, 'pagefind.js'),
    );
    expect(resolveAsset(root, '/fragment/en_abc.pf_fragment?x=1')).toBe(
      resolve(root, 'fragment/en_abc.pf_fragment'),
    );
  });
  it('rejects traversal outside the root', () => {
    expect(resolveAsset(root, '/../package.json')).toBe(
      resolve(root, 'package.json'),
    );
    expect(resolveAsset(root, '/%2e%2e/%2e%2e/package.json')).toBe(
      resolve(root, 'package.json'),
    );
    expect(resolveAsset(root, '/..%2f..%2fpackage.json')).toBe(
      resolve(root, 'package.json'),
    );
    for (const p of [
      '/../package.json',
      '/%2e%2e/%2e%2e/package.json',
      '/..%2f..%2fpackage.json',
    ]) {
      expect(resolveAsset(root, p)?.startsWith(root)).toBe(true);
    }
  });
  it('rejects null bytes and bad encoding', () => {
    expect(resolveAsset(root, '/a%00b')).toBeNull();
    expect(resolveAsset(root, '/%E0%A4%A')).toBeNull();
  });
});
