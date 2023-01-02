<script lang="ts">
	import Toast from '$lib/Toast.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	export let form: ActionData;
	let toastProps = { message: '', success: true, isOpen: false };
	$: {
		if (form?.success) {
			toastProps.message = 'Link copied to clipboard! 🎉';
			toastProps.success = true;
			toastProps.isOpen = true;
			navigator.clipboard.writeText(form?.link);
		}
	}
</script>

<main class="flex justify-center items-center w-full h-full flex-col space-y-8">
	<Toast {...toastProps} />
	<div class="text-center">
		<h1 class="font-bold text-5xl">Destructor</h1>
		<p class="text-md text-gray-600">Self destructing URL shortner</p>
	</div>

	<form method="POST" use:enhance>
		<div class="sm:flex rounded-md shadow-sm">
			<!-- dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 -->

			<input
				type="text"
				name="url"
				placeholder="URL"
				class="py-3 px-4 pr-11 block w-full shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 border-gray-200"
			/>
			<!-- dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 -->
			<input
				type="text"
				name="expiry"
				placeholder="1d"
				maxlength="2"
				class="py-3 px-4 pr-11 block w-full shadow-sm -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 w-1/6 border-gray-200"
			/>
			<!-- dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 -->
			<button
				class="py-3 px-4 inline-flex items-center min-w-fit w-full border border-gray-200 bg-gray-50 text-sm text-gray-500 -mt-px -ml-px first:rounded-t-lg last:rounded-b-lg sm:w-auto sm:first:rounded-l-lg sm:mt-0 sm:first:ml-0 sm:first:rounded-tr-none sm:last:rounded-bl-none sm:last:rounded-r-lg hover:bg-gray-100"
				>Generate</button
			>
		</div>
		{#if form?.error}
			<ul class="mt-2">
				{#each form.errors as error}
					<li class="text-red-400">{error.message}</li>
				{/each}
			</ul>
		{/if}
		<!-- <div class="relative">
			<div class="flex justify-center">
				<input
					type="text"
					name="url"
					placeholder="URL"
					class="p-4 block border border-gray-300 {urlErrors} focus:outline-none focus:ring focus:ring-violet-300 w-1/2"
				/>
				<input
					name="expiry"
					type="text"
					placeholder="1d"
					class="p-4 block border border-gray-300 w-1/12 {expiryErrors} focus:outline-none focus:ring focus:ring-violet-300"
				/>
				<button class="bg-sky-600 p-4 font-bold text-white w-1/5">Generate</button>
			</div> -->
		<!-- <div class="absolute left-20">
			
			</div> -->
		<!-- </div> -->
	</form>
</main>
