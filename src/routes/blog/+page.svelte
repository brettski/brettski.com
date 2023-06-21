<script>
	export let data;

	import dayjs from 'dayjs';
	import Header from '$components/Header.svelte';

	const { posts } = data;
	posts.sort((a, b) => b.postDate - a.postDate);

	const prettyDate = (date) => {
		return dayjs(date).format('YYYY-MM-DD_HH:mm').toString();
	};
</script>

<Header title="Blog" />

<div class="overflow-hidden rounded-md border border-gray-300 bg-white">
	<ul role="list" class="divide-y divide-gray-300">
		{#each posts as post}
			<li class="px-6 py-4">
                <a href="/blog/{post.slug}" class="flex space-x-8">
                    <div class="text-2xl font-bold text-gray-600">{post.title}</div>
                </a>
                <p class="text-gray-400 text-sm">{prettyDate(post.postDate)}</p>
							</li>
		{/each}
	</ul>
</div>
