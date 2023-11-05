import { ExecuteService } from '$lib/server/executeService';
import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const file = formData.get('files') as File;
		if (!(file as File).name || (file as File).name === 'undefined') {
			return fail(400, {
				error: true,
				message: 'You must provide a file to upload'
			});
		}

		await toHono(formData);
		return {};
		// const service = new ExecuteService();
		// const { file: convertedFileBuffer, name } = await service.writeFileAndConvert(file);
		// return {
		// 	name,
		// 	file: Array.from(new Uint8Array(convertedFileBuffer))
		// };
	}
} satisfies Actions;

async function toHono(formData: FormData) {
	try {
		const resp = await fetch('http://localhost:8000/convert', {
			method: 'POST',
			body: formData
		});
		console.log('RESPONSE', resp);
	} catch (error) {
		console.error('error', error);
	}
}
