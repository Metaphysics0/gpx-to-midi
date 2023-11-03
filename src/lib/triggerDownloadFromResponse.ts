import { browser } from '$app/environment';

export function triggerFileDownloadFromResponse(file: number[]): void {
	if (!browser) return;
	try {
		const uint8Array = new Uint8Array(file);
		const blob = new Blob([uint8Array], { type: 'audio/mid' });

		const link = document.createElement('a');
		link.href = window.URL.createObjectURL(blob);
		link.download = 'converted-midi.mid';
		link.click();
	} catch (error) {
		console.error('Error triggering download', error);
	}
}

// interface IDownloadResponse {
// 	file: number[];
// }
