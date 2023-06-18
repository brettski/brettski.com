<script>
    export let data;
</script>

<div>
    <p>Here:</p>
    <svelte:component this={data.content} />

</div>