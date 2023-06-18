<script>
    import "../app.css";

    import Header from '$components/Header.svelte';
    import Footer from '$components/Footer.svelte';
</script>

<Header />
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <slot />
</div>
<Footer />