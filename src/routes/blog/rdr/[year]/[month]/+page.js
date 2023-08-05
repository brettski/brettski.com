import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	console.log('From the year: params:', params);
	const { year, slug } = params;

	if (year && !slug) {
		throw redirect(308, `/blog?year=${year}`);
	}
}
