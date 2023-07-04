<script>
	export let blogPost;

	console.log('blogPost', blogPost);

	const { categories, tags, postDate, slug, title, content } = blogPost;

	/*
      blogPost {
        metadata: {
          title: 'Happy Green Day',
          date: '2007-03-17T13:09:27.000Z',
          categories: [ 'general' ],
          slug: 'happy-green-day'
        },
        categories: [ 'general' ],
        tags: [],
        postDate: '2007-03-17_08:09',
        slug: 'happy-green-day',
        title: 'Happy Green Day',
        content: { render: [Function: render], '$$render': [Function: $$render] },
        isoDate: 2007-03-17T13:09:27.000Z
      }
    */
</script>

<!-- <div class="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16"> -->
<article class="flex max-w-xl flex-col items-start justify-between">
	<div>
		<time datetime="2020-03-16" class="text-gray-500">{postDate}</time>
	</div>
	<div class="flex items-center gap-x-3 text-xs mt-1 mb-1">
		{#each categories as category}
			<span class="relative z-10 rounded-full bg-orange-100 px-3 py-1.5 font-medium text-gray-600"
				>{category}</span
			>
		{/each}
	</div>
	<div class="flex items-center gap-x-3 text-xs mt-1 mb-1">
		{#each tags as tag}
			<span class="relative z-10 rounded-full bg-blue-100 px-3 py-1.5 font-medium text-gray-600"
				>{tag}</span
			>
		{/each}
	</div>
	<div class="group relative">
		<h2 class="mt-3 text-lg font-semibold leading-6 text-gray-900 hover:text-gray-300">
			<a href="/blog/{slug}">
				<!-- <span class="absolute inset-0"></span> -->
				{title}
			</a>
		</h2>
		<p class="mt-5 line-clamp-6 text-sm leading-6 text-gray-600">
			hi
			<svelte:component this={content} />
		</p>
	</div>
	<!-- <div class="relative mt-8 flex items-center gap-x-4">
        <img src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-10 w-10 rounded-full bg-gray-50">
        <div class="text-sm leading-6">
          <p class="font-semibold text-gray-900">
            <a href="#">
              <span class="absolute inset-0"></span>
              Michael Foster
            </a>
          </p>
          <p class="text-gray-600">Co-Founder / CTO</p>
        </div>
      </div> -->
</article>

<!-- More posts... -->
<!-- </div> -->
