import { error } from '@sveltejs/kit';

export async function load({ parent, params }) {
    const { posts } = await parent();
    console.log('[]blog posts count', posts.length);
    const post = posts.find(p => p.slug === params.slug);

    if (post) 
    return {
        post
    }
    else  {
        console.error(`post '${params.slug}' not found`)
        throw error(404, `post not found`)
    }
    
}
