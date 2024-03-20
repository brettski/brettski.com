import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
// import { resolve } from 'path';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			$blog: '/src/_blog',
			$components: '/src/_components',
			$elements: '/src/_elements'
		},
		version: {
			name: process.env?.npm_package_version ?? '0.0.0.0'
		}
	},
	preprocess: [vitePreprocess(), mdsvex(mdsvexConfig)]
};

export default config;
