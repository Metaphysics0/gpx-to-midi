import type { Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { SUPPORTED_FILE_TYPES } from '$lib/constants';

export const actions = {
	default: async ({ request, fetch }) => {
		try {
			const formData = await request.formData();
			ensureFormDataIsValid(formData);

			const response = await fetch(`${env.CONVERT_API_HOST}/convert`, {
				method: 'POST',
				body: formData
			});
			return response.json();
		} catch (error) {
			console.error('error', error);
			return {};
		}
	}
} satisfies Actions;

function ensureFormDataIsValid(formData: FormData) {
	const file = formData.get('file') as File;
	if (!file) {
		throw new Error('Missing file in form data');
	}
	const fileExtension = file.name.split('.').at(-1);
	if (!SUPPORTED_FILE_TYPES.includes('.' + fileExtension)) {
		throw new Error(`Non supported file type: ${fileExtension}`);
	}
}
