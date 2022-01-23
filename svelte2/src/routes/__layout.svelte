<script context="module">
  import '../tailwind.css';
</script>

<script>
  //import Header from "$component/header.svelte";
  import Header from "../lib/component/header.svelte";
</script>

<div>
  <Header />
  <main>
    <slot />
  </main>

</div>