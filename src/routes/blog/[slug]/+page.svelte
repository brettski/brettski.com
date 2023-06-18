<script>
    import { page } from '$app/stores';

    export let data;

    const { post } = data;

    console.log('heres our post', post);

</script>

<div>
    <p>Here:</p>
    <svelte:component this={post.content} />

</div>