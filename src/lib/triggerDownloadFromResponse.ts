import { browser } from '$app/environment';

export function triggerFileDownloadFromResponse(resp: IDownloadResponse): void {
	if (!browser) return;
	try {
		const uint8Array = new Uint8Array(resp.file);
		const blob = new Blob([uint8Array], { type: 'audio/mid' });

		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = `${resp.name}.mid`;
		link.click();
	} catch (error) {
		console.error('Error triggering download', error);
	}
}

interface IDownloadResponse {
	file: number[];
	name: string;
}
