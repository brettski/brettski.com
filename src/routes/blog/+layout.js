import dayjs from 'dayjs';
import { error } from '@sveltejs/kit';
import { getPosts } from '$blog/getPosts';

export async function load() {
	let posts = [];
	try {
		posts = await getPosts();
		console.log('layout post count', posts?.length);
	} catch (err) {
		console.error(`error retrieving posts`, err);
		throw error(404, 'no posts');
	}
	const filterYear = new Set();
	const filterCategory = new Set();
	const filterTag = new Set();
	posts = posts.map((p) => {
		p.categories.forEach((c) => filterCategory.add(c));
		p.tags.forEach((c) => filterTag.add(c));
		const postYear = dayjs(p.postDate).format('YYYY').toString();
		filterYear.add(postYear);
		const post = {
			...p,
			isoDate: p.postDate,
			postDate: dayjs(p.postDate).format('YYYY-MM-DD HH:mm').toString(),
			postYear
		};

		return post;
	});

	const asort = (a, b) => {
		if (a < b) return -1;
		if (b < a) return 1;
		return 0;
	};

	return {
		posts,
		filterYear: [...filterYear].sort((a, b) => b - a),
		filterCategory: [...filterCategory].sort(asort),
		filterTag: [...filterTag].sort(asort)
	};
}
