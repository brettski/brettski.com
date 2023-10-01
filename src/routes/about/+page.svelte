<script>
	const osProjects = [
		{
			name: 'Svelte',
			url: 'https://svelte.dev'
		},
		{
			name: 'Sveltekit',
			url: 'https://kit.svelte.dev'
		},
		{
			name: 'Tailwindcss',
			url: 'https://tailwindcss.com'
		},
		{
			name: 'Tailwindcss UI',
			url: 'https://tailwindui.com'
		},
		{
			name: 'Node.js®',
			url: 'https://nodejs.org'
		},
		{
			name: 'ESLint',
			url: 'https://eslint.org/'
		},
		{
			name: 'Prettier',
			url: 'https://prettier.io/'
		}
	];
</script>

<div class="bg-white px-6 py-32 lg:px-8">
	<div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
		<p class="text-base font-semibold leading-7 text-indigo-600">Information</p>
		<h1 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About</h1>
		<p class="mt-6 text-xl leading-8">Little improvement each and every day</p>
		<div class="mt-10 max-w-2xl">
			<!-- <p>
				Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
				semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
				viverra tellus varius sit neque erat velit. Faucibus commodo massa rhoncus, volutpat.
				Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.
			</p>
			<p class="mt-8">
				Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit
				molestie auctor fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius
				vulputate et ultrices hac adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem
				vel integer orci.
			</p> -->
			<h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">
				About me, about the site? <span class="text-lg text-gray-600">¯\_(ツ)_/¯</span>
				<em class="text-gray-600">TBD...</em>
			</h2>
			<p class="mt-6">
				Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum
				urna ...
			</p>
		</div>
		<div class="mt-16 max-w-2xl">
			<h2 class="text-2xl font-bold tracking-tight text-gray-900">THANK YOU</h2>
			<p class="mt-6">
				Thank you to these awesome open source project, without whom this site, and so many other
				projects would not exist.
			</p>
			{#each osProjects as osp}
				<ul role="list" class="mt-1 max-w-xl space-y-8 text-gray-600">
					<li class="flex gap-x-3">
						<svg
							class="mt-1 h-5 w-5 flex-none text-green-600"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true"
						>
							<path
								fill-rule="evenodd"
								d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
								clip-rule="evenodd"
							/>
						</svg>
						<span> <a class="hover:text-green-600" href={osp.url}>{osp.name}</a></span>
					</li>
				</ul>
			{/each}
		</div>
		<!-- <div class="mt-16 max-w-2xl">
			<h2 class="text-2xl font-bold tracking-tight text-gray-900">
				Everything you need to get up and running
			</h2>
			<p class="mt-6">
				Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus
				volutpat cras. In amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
				viverra ridiculus non molestie. Gravida quis fringilla amet eget dui tempor dignissim.
				Facilisis auctor venenatis varius nunc, congue erat ac. Cras fermentum convallis quam.
			</p>
			<p class="mt-8">
				Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris
				semper sed amet vitae sed turpis id. Id dolor praesent donec est. Odio penatibus risus
				viverra tellus varius sit neque erat velit.
			</p>
		</div> -->
	</div>
</div>
