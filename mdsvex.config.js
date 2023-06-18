const config = {
    extensions: ['.md','.svx'],
    layout: {
		blog: './src/_elements/layouts/markdown/Blog.svelte',
        _: './src/_elements/layouts/markdown/Blog.svelte'
	},
    smartypants: {
        dashes: 'oldschool',
    },
};

export default config;