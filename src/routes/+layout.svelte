<script>
	import '../app.css';

	import Nav from '$components/Nav.svelte';
	import Footer from '$components/Footer.svelte';
</script>

<Nav />
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
	<!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
	<div class="mx-auto max-w-6xl">
		<slot />
	</div>
</div>
<Footer />
