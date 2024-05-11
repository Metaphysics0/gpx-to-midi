<script lang="ts">
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import { triggerFileDownloadFromResponse } from '$lib/triggerDownloadFromResponse';
	import Dropzone from './Dropzone.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	let files: FileList;
	$: files;

	let isDownloadInProgress = false;
</script>

<form
	method="POST"
	class="flex flex-col"
	enctype="multipart/form-data"
	use:enhance={() => {
		isDownloadInProgress = true;
		return async ({ result, update }) => {
			try {
				isDownloadInProgress = false;
				const { file, name } = result?.data;
				if (!file) {
					console.error('error getting file from result');
					toastStore.trigger({
						message: 'Something went wrong during the convert 😢',
						background: 'variant-filled-warning'
					});
					return;
				}

				triggerFileDownloadFromResponse({ file, name });
				update({ reset: true });
			} catch (error) {
				isDownloadInProgress = false;
				toastStore.trigger({
					message: 'Something went wrong during the convert 😢',
					background: 'variant-filled-warning'
				});
			}
		};
	}}
>
	<Dropzone {isDownloadInProgress} bind:files />
	<button
		type="submit"
		class="mt-2.5 btn variant-filled-primary w-fit mx-auto rounded-full"
		disabled={!files}>Convert!</button
	>
</form>
