<script>
    export let data;

    import Header from '$components/Header.svelte';

    const { post } = data;

    console.log('heres our post', post);

</script>

<Header title={post.title} />
<div>
    <p>Here:</p>
    <svelte:component this={post.content} />

</div>