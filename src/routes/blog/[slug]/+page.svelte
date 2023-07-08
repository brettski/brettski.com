<script>
	export let data;

	import Header from '../_components/Header.svelte';

	const { post } = data;

	console.log('heres our post', post);
</script>

<Header title={post.title} />
<div>
	<svelte:component this={post.content} />
</div>
