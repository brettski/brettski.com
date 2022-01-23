<script context="module">
  import '../tailwind.css';
</script>

<script>
  //import Header from "$component/header.svelte";
  import Header from "../lib/component/header.svelte";
  import Footer from "../lib/component/footer.svelte";
</script>

<div>
  <Header />
  <main class="h-3/4">
    <slot />
  </main>
  <Footer />
</div>