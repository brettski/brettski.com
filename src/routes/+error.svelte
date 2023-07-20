<script>
	import { page } from '$app/stores';
	import { dev } from '$app/environment';

	let errorMessage = $page.error.message ?? 'Page not found';
</script>

{#if $page.status === 404}
	<!--
  This example requires updating your template:

  ```
  <html class="h-full">
  <body class="h-full">
  ```
-->
	<main class="relative isolate min-h-full">
		<img
			src="/images/Tolkien_wondering.jpg"
			alt=""
			class="absolute inset-0 -z-10 h-full w-full object-cover object-top"
		/>
		<div class="mx-auto max-w-7xl px-6 py-32 text-left sm:py-40 lg:px-8">
			<p class="text-base font-semibold leading-8 text-gray-800">404</p>
			<h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-600 sm:text-5xl">
				{errorMessage}
			</h1>
			<p class="mt-4 text-base text-gray-900 sm:mt-6">
				Sorry, we couldn’t find the page you’re looking for.
			</p>
			<div class="mt-4 flex justify-left">
				<a href="/" class="text-sm font-semibold leading-7 text-gray-800"
					><span aria-hidden="true">&larr;</span> Back to home</a
				>
			</div>
		</div>
	</main>
{:else}
	<p>well that's not right</p>
	<p>{$page.status}</p>
	<p>{$page.error.message ?? ''}</p>
{/if}

{#if dev && $page.error.stack}
	<p class="mt-10 max-w-lg text-base text-red-500">
		{$page.error.stack}
	</p>
{/if}
