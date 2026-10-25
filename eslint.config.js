import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';

export default [
  {
    ignores: [
      'dist',
      '.astro',
      '.dev-index',
      'blog/**',
      'src/content',
      '.wrangler',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    // Plain browser scripts served as-is from public/.
    files: ['public/**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        localStorage: 'readonly',
        matchMedia: 'readonly',
      },
    },
  },
];
