import { error } from '@sveltejs/kit';
import { getPosts } from '$blog/getPosts';

export async function load() {
    let posts
    try {
        posts = await getPosts();
        console.log('post count', posts?.length);
    }
    catch (err) {
        console.error(`error retrieving posts`, err);
        throw error(404, 'no posts');
    }
    
    return {
        posts,
    }
}