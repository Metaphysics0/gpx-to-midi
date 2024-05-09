<script lang="ts">
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import { triggerFileDownloadFromResponse } from '$lib/triggerDownloadFromResponse';
	import Dropzone from './Dropzone.svelte';

	let files: FileList;
</script>

<form
	method="POST"
	class="flex flex-col"
	enctype="multipart/form-data"
	use:enhance={() => {
		return async ({ result, update }) => {
			const { file, name } = result?.data;
			if (!file) {
				console.error('error getting file from result');
				return;
			}

			triggerFileDownloadFromResponse({ file, name });
			update({ reset: true });
		};
	}}
>
	<Dropzone bind:files />
	<button type="submit" class="mt-2.5 btn variant-filled-primary w-fit mx-auto rounded-full"
		>Convert!</button
	>
</form>
