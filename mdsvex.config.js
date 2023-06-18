const config = {
    extensions: ['.md','.svx'],
    layout: {
		blog: './src/_components/layouts/markdown/Blog.svelte',
        _: './src/_components/layouts/markdown/Blog.svelte'
	},
    smartypants: {
        dashes: 'oldschool',
    },
};

export default config;