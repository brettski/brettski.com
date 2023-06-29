import dayjs from 'dayjs';
import { error } from '@sveltejs/kit';
import { getPosts } from '$blog/getPosts';

export async function load() {
    let posts;
    try {
        posts = await getPosts();
        console.log('post count', posts?.length);
    }
    catch (err) {
        console.error(`error retrieving posts`, err);
        throw error(404, 'no posts');
    }
    console.log('posts 0', posts[0])
    const filterYear = new Set();
    const filterCategory = new Set();
    const filterTag = new Set();
    posts = posts.map(p => {
        p.categories.forEach(c => filterCategory.add(c));
        p.tags.forEach(c => filterTag.add(c));
        filterYear.add(dayjs(p.postDate).format('YYYY').toString())
        const post = {
        ...p,
        postDate: dayjs(p.postDate).format('YYYY-MM-DD_HH:mm').toString(),
        };

        return post;
    })
    
    return {
        posts,
        filterYear: [...filterYear],
        filterCategory: [...filterCategory],
        filterTag: [...filterTag],
    }
}