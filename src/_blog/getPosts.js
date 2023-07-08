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
	console.log('results count', results.length);

	return results;
}
