import type { Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		try {
			const response = await fetch(`${env.API_HOST}/convert`, {
				method: 'POST',
				body: formData
			});

			return response.json();
		} catch (error) {
			console.log('error', error);
			return {};
		}
	}
} satisfies Actions;
