<script lang="ts">
	import { SUPPORTED_FILE_TYPES } from '$lib/constants';
	import Icon from '@iconify/svelte';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';

	const toastStore = getToastStore();

	export let files: FileList;

	function removeFile() {
		try {
			const dropzoneElement = document.getElementById('dropzone') as HTMLInputElement;
			if (!dropzoneElement) {
				throw new Error('Unable to locate dropzone element');
			}
			dropzoneElement.value = '';
			fileInputName = '';
		} catch (error) {
			console.warn(error);
			toastStore.trigger({
				message: 'Error removing file from dropzone',
				background: 'variant-filled-warning'
			});
		}
	}

	function getFileInputName(): string {
		try {
			const dropzoneElement = document.getElementById('dropzone') as HTMLInputElement;
			return (dropzoneElement.files || [])[0]?.name || '';
		} catch (error) {
			return '';
		}
	}

	function onChangeHandler(e: Event): void {
		fileInputName = getFileInputName();
	}

	let fileInputName = getFileInputName();
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
	id="dropzone"
	name="file"
	accept={SUPPORTED_FILE_TYPES.join(',')}
	bind:files
	on:change={onChangeHandler}
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
	{#if fileInputName}
		<p class="flex items-center">
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<span class="mr-2 cursor-pointer opacity-70" on:click={removeFile}>
				<Icon icon="fa-solid:times" />
			</span>
			{fileInputName}
		</p>
	{/if}
</div>
