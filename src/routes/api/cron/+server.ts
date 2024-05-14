import { env } from '$env/dynamic/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET = (async () => {
	try {
		const gpFileToConvert = await getStaticGpFileToConvert();
		if (!gpFileToConvert) throw new Error('missing gpFile');

		const formData = new FormData();
		formData.append('file', gpFileToConvert);

		const response = await fetch(`${env.CONVERT_API_HOST}/convert`, {
			method: 'POST',
			body: formData
		});
		return json(response);
	} catch (error) {
		console.error('GET /api/crons failed', error);
		return json({ error: 'Error calling CRON' });
	}
}) satisfies RequestHandler;

async function getStaticGpFileToConvert() {
	try {
		const response = await fetch(`${env.CDN_URL}/assets/thrive.gp`);
		return response.blob();
	} catch (error) {
		console.error('error getting static asset from cdn', error);
	}
}
