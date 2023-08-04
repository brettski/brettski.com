import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	console.log('[]blog posts count', params);
	const { slug } = params;
	const { posts } = await parent();
	const post = posts.find((p) => p.slug === slug);

	if (post) {
		throw redirect(308, `/blog/${post.slug}`);
	} else {
		throw error(404, `post not found`);
	}
}
