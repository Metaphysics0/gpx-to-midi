<script lang="ts">
	// @ts-nocheck

	import { enhance } from '$app/forms';
	import { triggerFileDownloadFromResponse } from '$lib/triggerDownloadFromResponse';
	import Dropzone from './Dropzone.svelte';
</script>

<form
	method="POST"
	class="flex flex-col"
	enctype="multipart/form-data"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			const { file, name } = result?.data;
			if (!file) {
				console.error('error getting file from result');
				return;
			}

			triggerFileDownloadFromResponse({ file, name });
		};
	}}
>
	<Dropzone />
	<button
		type="submit"
		class="mt-2.5 btn bg-gradient-to-br variant-gradient-primary-secondary w-fit mx-auto rounded-full"
		>Convert!</button
	>
</form>
