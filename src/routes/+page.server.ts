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

		const service = new ExecuteService();
		const { file: convertedFileBuffer, name } = await service.writeFileAndConvert(file);
		return {
			name,
			file: Array.from(new Uint8Array(convertedFileBuffer))
		};
	}
} satisfies Actions;
