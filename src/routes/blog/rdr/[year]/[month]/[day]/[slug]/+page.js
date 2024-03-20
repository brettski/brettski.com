import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ params, parent }) {
	const { slug } = params;
	const { posts } = await parent();
	const post = posts.find((p) => p.slug === slug);

	if (post) {
		redirect(308, `/blog/${post.slug}`);
	} else {
		error(404, `post not found`);
	}
}
