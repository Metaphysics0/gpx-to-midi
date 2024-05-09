import type { Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			const formData = await request.formData();
			const response = await fetch(`${env.CONVERT_API_HOST}/convert`, {
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
