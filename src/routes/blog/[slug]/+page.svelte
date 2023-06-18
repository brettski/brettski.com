<script>
    export let data;

    console.log('pageish', data)
</script>

<div class="prose">
    <p>Here:</p>
    <svelte:component this={data.content} />

</div>