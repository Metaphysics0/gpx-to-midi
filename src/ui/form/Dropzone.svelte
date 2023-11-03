<script lang="ts">
	import { SUPPORTED_FILE_TYPES } from '$lib/constants';
	import Icon from '@iconify/svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';

	let files: FileList;
</script>

<svelte:head>
	<style>
		.dropzone-lead {
			margin-right: auto;
			margin-left: auto;
			width: fit-content;
		}
	</style>
</svelte:head>

<FileDropzone
	name="files"
	accept={SUPPORTED_FILE_TYPES.join(',')}
	bind:files
	required
	class="max-w-4xl mx-auto rounded-sm"
>
	<svelte:fragment slot="lead">
		<Icon icon="fa6-solid:file-arrow-up" class="text-4xl" />
	</svelte:fragment>
	<svelte:fragment slot="message">
		<strong>Upload a file</strong> or drag and drop
	</svelte:fragment>
	<svelte:fragment slot="meta">{SUPPORTED_FILE_TYPES.join(', ')} allowed.</svelte:fragment>
</FileDropzone>

<div class="mt-3 mb-1.5 h-4 mx-auto w-fit flex flex-col items-center justify-center">
	<p>
		{#if files?.length}
			{Array.from(files || []).map((file) => file.name)} ✅
		{/if}
	</p>
</div>
