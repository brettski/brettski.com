export async function getPosts() {
	let posts = Object.entries(import.meta.glob('./posts/*.md'));

	const all = posts.map(async ([, post]) => {
		const r = await post();
		return {
			metadata: r.metadata,
			categories: r.metadata?.categories ?? [],
			tags: r.metadata?.tags ?? [],
			postDate: new Date(r.metadata.date),
			slug: r.metadata.slug,
			title: r.metadata.title,
			content: r.default
		};
	});

	const results = await Promise.all(all);
	console.log('results count', results.count);

	return results;

	// const [,post] = posts[0];
	// console.log('the post:', post);
	// const rendered = await post();
	// console.log('rendered:', rendered);
	// const out = {
	//     metadata: rendered.metadata,
	//     content: rendered.default
	// }
	// return [out]
	// .map(([, post]) => {
	//     post().then(r => {

	//         console.log('the post:', r)
	//         return { metadata: r.metadata, component: r.default }
	//     })

	// })
	// // sort by date
	// .sort((a, b) => {
	// 	return new Date(a.metadata.date).getTime() < new Date(b.metadata.date).getTime() ? 1 : -1;
	// });

	// if (limit) {
	// 	return posts.slice(0, limit);
	// }

	// return posts;
}
