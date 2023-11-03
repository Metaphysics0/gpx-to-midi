<script lang="ts">
	import { SUPPORTED_FILE_TYPES } from '$lib/constants';
	import Icon from '@iconify/svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';

	export let files: FileList;

	function removeFile() {
		// @ts-ignore
		files = Array.from(files).filter((file, idx) => idx !== 0);
	}
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
	{#if files?.length}
		<p class="flex items-center">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="mr-2 cursor-pointer opacity-70" on:click={removeFile}>
				<Icon icon="fa-solid:times" />
			</span>
			{Array.from(files || []).map((file) => file.name)}
		</p>
	{/if}
</div>
