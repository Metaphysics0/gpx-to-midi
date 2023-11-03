<script>
	import { enhance } from '$app/forms';
	import { triggerFileDownloadFromResponse } from '$lib/triggerDownloadFromResponse';
	import Dropzone from '../ui/Dropzone.svelte';
</script>

<h1 class="text-xl w-fit mx-auto mt-2 mb-2.5">Guitar Pro to MIDI Converter</h1>
<form
	method="POST"
	class="flex flex-col"
	enctype="multipart/form-data"
	use:enhance={({ formElement, formData, action, cancel, submitter }) => {
		return async ({ result, update }) => {
			console.log('RESULT', result);
			const { file, name } = result?.data;
			if (!file) {
				console.error('error getting file from result');
				return;
			}

			triggerFileDownloadFromResponse({ file, name });
		};
	}}
>
	<div class="mb-5">
		<Dropzone />
	</div>
	<button type="submit" class="btn variant-filled w-fit mx-auto">Submit</button>
</form>
