import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { year, slug } = params;

	if (year && !slug) {
		throw redirect(308, `/blog?year=${year}`);
	}
}
