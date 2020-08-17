<script>
  import posts from '../../server/posts';
</script>

<h1>Blog</h1>

<!-- iterate through each post -->
{#each posts().all() as post}
  <article>
    <!-- link article to /posts/$permalink -->   
    <a href={`/posts/${post.slug}`}>
      <h3>{post.title}</h3>
    </a>
    <div>categories: {post.categories ? post.categories : ''}</div>
    <div>tags: {post.tags ? post.tags : ''}</div>
    <hr />
  </article>
{/each}