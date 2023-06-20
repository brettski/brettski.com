<script>
    export let data;

    const { posts } = data;
    console.log('posts in page', posts[0])
</script>

<div>
    <ul>
        {#each posts as post} 
            <li><a href="/blog/{post.slug}">{post.title}</a></li>
        {/each}
    </ul>
</div>