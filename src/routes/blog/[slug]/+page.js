import { error } from '@sveltejs/kit';
import { getPosts } from '$blog/getPosts';

export async function load({ params }) {
    let post;
    let content;
    let metadata;
    try {
        const posts = await getPosts();
        console.log('post count', posts?.length);
        post = posts.find(p => p?.metadata?.slug === params.slug);
        content = post.content
        metadata = post.metadata;
        console.log('shit:', post)
    }
    catch (err) {
        console.error(`post ${ params.slug } not found`, err);
        throw error(404, 'Post not found');
    }
    
    return {
        content,
        metadata,
        post,
    }
}