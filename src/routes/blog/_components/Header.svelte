<script>
	export let title;
</script>

<header class="py-10">
	<div
		class="flex items-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 hover:text-green-300 text-gray-500"
	>
		<a href="/blog">
			<svg
				class="h-12 w-12"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M19 12H5M12 19l-7-7 7-7" />
			</svg>
		</a>
		<h1 class="text-3xl font-bold tracking-tight text-gray-800">{title}</h1>
	</div>
</header>
