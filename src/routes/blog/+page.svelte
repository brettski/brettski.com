<script>
	export let data;

	import { page } from '$app/stores';
	import dayjs from 'dayjs';
	import Pagination from './_components/Pagination.svelte';
	import BlogEntry from './_components/BlogEntry.svelte';

	const { url } = $page;
	const yearParam = url.searchParams.get('year');
	const { posts, filterYear, filterCategory, filterTag } = data;
	posts.sort((a, b) => dayjs(b.isoDate) - dayjs(a.isoDate));

	// filters
	console.log(
		'🚓 counts: year, category, tag',
		filterYear.length,
		filterCategory.length,
		filterTag.length
	);
	const yearFilterItems = filterYear.map((f) => ({ name: f, isSelected: false }));
	const categoryFilterItems = filterCategory.map((f) => ({ name: f, isSelected: false }));
	const tagFilterItems = filterTag.map((f) => ({ name: f, isSelected: false }));

	// menu control
	let yearState = 'hidden';
	let categoryState = 'hidden';
	let tagState = 'hidden';
	const plusState = (stateValue) => (stateValue ? '' : 'hidden');
	const minusState = (stateValue) => (stateValue ? 'hidden' : '');
	const toggleYear = () => (yearState === 'hidden' ? (yearState = '') : (yearState = 'hidden'));
	const toggleCategory = () =>
		categoryState === 'hidden' ? (categoryState = '') : (categoryState = 'hidden');
	const toggleTag = () => (tagState === 'hidden' ? (tagState = '') : (tagState = 'hidden'));
	let isShowSort = false;
	const toggleShowSort = () => (isShowSort = !isShowSort);
	let mobileFilterMenuIsOpen = false;
	function toggleMobileFilterMenu() {
		mobileFilterMenuIsOpen = !mobileFilterMenuIsOpen;
	}

	let filteredPosts = posts;
	let pageNumber = 1;
	let pageSize = 15;
	let pagedPosts;

	function filterSelectHandler() {
		setTimeout(() => {
			let selectedYears = yearFilterItems.filter((y) => y.isSelected).map((z) => z.name);
			let selectedCategories = categoryFilterItems.filter((y) => y.isSelected).map((z) => z.name);
			let selectedTags = tagFilterItems.filter((y) => y.isSelected).map((z) => z.name);
			filteredPosts = posts;
			if (selectedYears.length > 0 || selectedCategories.length > 0 || selectedTags.length > 0) {
				console.log('🧪 filter selection');
				filteredPosts = posts.filter(
					(f) =>
						selectedYears.includes(f.postYear) ||
						f.categories.reduce((a, c) => a || selectedCategories.includes(c), false) ||
						f.tags.reduce((a, c) => a || selectedTags.includes(c), false)
				);
			}
		}, 0);
	}

	let doRefresh = false;
	yearFilterItems.forEach((item) => {
		if (item.name === yearParam) {
			item.isSelected = true;
			doRefresh = true;
		}
	});
	if (doRefresh) {
		filterSelectHandler();
		yearState = '';
	}

	$: {
		console.log('filteredPosts.slice');
		pagedPosts = filteredPosts.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
	}
</script>

<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<div class="bg-white">
	<div>
		<!--
		Mobile filter dialog
  
		Off-canvas filters for mobile, show/hide based on off-canvas filters state.
	  -->
		{#if mobileFilterMenuIsOpen}
			<div class="relative z-40 lg:hidden" role="dialog" aria-modal="true">
				<!--
			Off-canvas menu backdrop, show/hide based on off-canvas menu state.
	
			Entering: "transition-opacity ease-linear duration-300"
				From: "opacity-0"
				To: "opacity-100"
			Leaving: "transition-opacity ease-linear duration-300"
				From: "opacity-100"
				To: "opacity-0"
		-->
				<div class="fixed inset-0 bg-black bg-opacity-25" />

				<div class="fixed inset-0 z-40 flex">
					<!--
				Off-canvas menu, show/hide based on off-canvas menu state.
	
				Entering: "transition ease-in-out duration-300 transform"
				From: "translate-x-full"
				To: "translate-x-0"
				Leaving: "transition ease-in-out duration-300 transform"
				From: "translate-x-0"
				To: "translate-x-full"
			-->
					<div
						class="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
					>
						<div class="flex items-center justify-between px-4">
							<h2 class="text-lg font-medium text-gray-900">Filters</h2>
							<button
								type="button"
								class="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
								on:click={toggleMobileFilterMenu}
							>
								<span class="sr-only">Close menu</span>
								<svg
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>

						<!-- Filters -->
						<form class="mt-4 border-t border-gray-200">
							<h3 class="sr-only">Categories</h3>
							<ul role="list" class="px-2 py-3 font-medium text-gray-900">
								<li>
									<!-- svelte-ignore a11y-invalid-attribute -->
									<a href="#" class="block px-2 py-3">Top Link A</a>
								</li>
								<li>
									<a href="#" class="block px-2 py-3">Top Link B</a>
								</li>
							</ul>

							<div class="border-t border-gray-200 px-4 py-6">
								<h3 class="-mx-2 -my-3 flow-root">
									<!-- Expand/collapse section button -->
									<button
										on:click={toggleYear}
										type="button"
										class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-mobile-0"
										aria-expanded="false"
									>
										<span class="font-medium text-gray-900">Year</span>
										<span class="ml-6 flex items-center">
											<!-- Expand icon, show/hide based on section open state. -->
											<svg
												class="h-5 w-5 {plusState(yearState)}"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
												/>
											</svg>
											<!-- Collapse icon, show/hide based on section open state. -->
											<svg
												class="h-5 w-5 {minusState(yearState)}"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</h3>
								<!-- Filter section, show/hide based on section state. -->
								<div class="pt-6 {yearState}" id="filter-section-mobile-0">
									<div class="space-y-6">
										{#each yearFilterItems as item, idx}
											<div class="flex items-center">
												<input
													bind:checked={item.isSelected}
													id="filter-mobile-tag-{idx}"
													name={item.name}
													value={item.name}
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													on:click={filterSelectHandler}
												/>
												<label
													for="filter-mobile-tag-{idx}"
													class="ml-3 min-w-0 flex-1 text-gray-500">{item.name}</label
												>
											</div>
										{/each}
										<!-- <div class="flex items-center">
									<input id="filter-mobile-color-0" name="year[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
									<label for="filter-mobile-color-0" class="ml-3 min-w-0 flex-1 text-gray-500">White</label>
									</div>
									<div class="flex items-center">
									<input id="filter-mobile-color-1" name="year[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
									<label for="filter-mobile-color-1" class="ml-3 min-w-0 flex-1 text-gray-500">Beige</label>
									</div>
									<div class="flex items-center">
									<input id="filter-mobile-color-2" name="year[]" value="blue" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
									<label for="filter-mobile-color-2" class="ml-3 min-w-0 flex-1 text-gray-500">Blue</label>
									</div> -->
									</div>
								</div>
							</div>
							<div class="border-t border-gray-200 px-4 py-6">
								<h3 class="-mx-2 -my-3 flow-root">
									<!-- Expand/collapse section button -->
									<button
										on:click={toggleCategory}
										type="button"
										class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-mobile-1"
										aria-expanded="false"
									>
										<span class="font-medium text-gray-900">Category</span>
										<span class="ml-6 flex items-center">
											<!-- Expand icon, show/hide based on section open state. -->
											<svg
												class="h-5 w-5 {plusState(categoryState)}"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
												/>
											</svg>
											<!-- Collapse icon, show/hide based on section open state. -->
											<svg
												class="h-5 w-5 {minusState(categoryState)}"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</h3>
								<!-- Filter section, show/hide based on section state. -->
								<div class="pt-6 {categoryState}" id="filter-section-mobile-1">
									<div class="space-y-6">
										{#each categoryFilterItems as item, idx}
											<div class="flex items-center">
												<input
													bind:checked={item.isSelected}
													id="filter-mobile-category-{idx}"
													name={item.name}
													value={item.name}
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													on:click={filterSelectHandler}
												/>
												<label
													for="filter-mobile-category-{idx}"
													class="ml-3 min-w-0 flex-1 text-gray-500">{item.name}</label
												>
											</div>
										{/each}
										<!-- <div class="flex items-center">
					  <input id="filter-mobile-category-0" name="category[]" value="new-arrivals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
					  <label for="filter-mobile-category-0" class="ml-3 min-w-0 flex-1 text-gray-500">New Arrivals</label>
					</div>
					<div class="flex items-center">
					  <input id="filter-mobile-category-1" name="category[]" value="sale" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
					  <label for="filter-mobile-category-1" class="ml-3 min-w-0 flex-1 text-gray-500">Sale</label>
					</div>
					<div class="flex items-center">
					  <input id="filter-mobile-category-2" name="category[]" value="travel" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
					  <label for="filter-mobile-category-2" class="ml-3 min-w-0 flex-1 text-gray-500">Travel</label>
					</div> -->
									</div>
								</div>
							</div>
							<div class="border-t border-gray-200 px-4 py-6">
								<h3 class="-mx-2 -my-3 flow-root">
									<!-- Expand/collapse section button -->
									<button
										on:click={toggleTag}
										type="button"
										class="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500"
										aria-controls="filter-section-mobile-2"
										aria-expanded="false"
									>
										<span class="font-medium text-gray-900">Tag</span>
										<span class="ml-6 flex items-center">
											<!-- Expand icon, show/hide based on section open state. -->
											<svg
												class="h-5 w-5 {plusState(tagState)}"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
												/>
											</svg>
											<!-- Collapse icon, show/hide based on section open state. -->
											<svg
												class="h-5 w-5 {minusState(tagState)}"
												viewBox="0 0 20 20"
												fill="currentColor"
												aria-hidden="true"
											>
												<path
													fill-rule="evenodd"
													d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
													clip-rule="evenodd"
												/>
											</svg>
										</span>
									</button>
								</h3>
								<!-- Filter section, show/hide based on section state. -->
								<div class="pt-6 {tagState}" id="filter-section-mobile-2">
									<div class="space-y-6">
										{#each tagFilterItems as item, idx}
											<div class="flex items-center">
												<input
													bind:checked={item.isSelected}
													id="filter-mobile-size-{idx}"
													name={item.name}
													value={item.name}
													type="checkbox"
													class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													on:click={filterSelectHandler}
												/>
												<label
													for="filter-mobile-tag-{idx}"
													class="ml-3 min-w-0 flex-1 text-gray-500">{item.name}</label
												>
											</div>
										{/each}

										<!-- <div class="flex items-center">
									<input id="filter-mobile-size-0" name="tag[]" value="2l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
									<label for="filter-mobile-size-0" class="ml-3 min-w-0 flex-1 text-gray-500">2L</label>
									</div>
									<div class="flex items-center">
									<input id="filter-mobile-size-1" name="tag[]" value="6l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
									<label for="filter-mobile-size-1" class="ml-3 min-w-0 flex-1 text-gray-500">6L</label>
									</div>
									<div class="flex items-center">
									<input id="filter-mobile-size-2" name="tag[]" value="12l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
									<label for="filter-mobile-size-2" class="ml-3 min-w-0 flex-1 text-gray-500">12L</label>
									</div>  -->
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		{/if}

		<main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
				<h1 class="text-4xl font-bold tracking-tight text-gray-900">Blog</h1>

				<div class="flex items-center">
					<div class="relative inline-block text-left">
						<div>
							<button
								type="button"
								class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
								id="menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								on:click={toggleShowSort}
							>
								Sort
								<svg
									class="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
									viewBox="0 0 20 20"
									fill="currentColor"
									aria-hidden="true"
								>
									<path
										fill-rule="evenodd"
										d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
						</div>

						<!--
							Dropdown menu, show/hide based on menu state.
			
							Entering: "transition ease-out duration-100"
							From: "transform opacity-0 scale-95"
							To: "transform opacity-100 scale-100"
							Leaving: "transition ease-in duration-75"
							From: "transform opacity-100 scale-100"
							To: "transform opacity-0 scale-95"
						-->
						{#if isShowSort}
							<div
								class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="menu-button"
								tabindex="-1"
							>
								<div class="py-1" role="none">
									<!--
									Active: "bg-gray-100", Not Active: ""
				
									Selected: "font-medium text-gray-900", Not Selected: "text-gray-500"
									-->
									<a
										href="#"
										class="font-medium text-gray-900 block px-4 py-2 text-sm"
										role="menuitem"
										tabindex="-1"
										id="menu-item-0">Most Popular</a
									>
									<a
										href="#"
										class="text-gray-500 block px-4 py-2 text-sm"
										role="menuitem"
										tabindex="-1"
										id="menu-item-1">Date descending</a
									>
									<!-- <a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">Newest</a>
									<a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-3">Price: Low to High</a>
									<a href="#" class="text-gray-500 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-4">Price: High to Low</a> -->
								</div>
							</div>
						{/if}
					</div>

					<button type="button" class="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
						<span class="sr-only">View grid</span>
						<svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
					<button
						type="button"
						class="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
						on:click={toggleMobileFilterMenu}
					>
						<span class="sr-only">Filters</span>
						<svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
							<path
								fill-rule="evenodd"
								d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			</div>

			<section aria-labelledby="products-heading" class="pb-24 pt-6">
				<h2 id="products-heading" class="sr-only">Products</h2>

				<div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
					<!-- Filters -->
					<form class="hidden lg:block">
						<h3 class="sr-only">Categories</h3>
						<ul
							role="list"
							class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
						>
							<li>
								<a href="#">Top Link A</a>
							</li>
							<li>
								<a href="#">Top Link B</a>
							</li>
						</ul>

						<div class="border-b border-gray-200 py-6">
							<h3 class="-my-3 flow-root">
								<!-- Expand/collapse section button -->
								<button
									on:click={toggleYear}
									type="button"
									class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
									aria-controls="filter-section-0"
									aria-expanded="false"
								>
									<span class="font-medium text-gray-900">Year</span>
									<span class="ml-6 flex items-center">
										<!-- Expand icon, show/hide based on section open state. -->
										<svg
											class="h-5 w-5 {plusState(yearState)}"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
											/>
										</svg>
										<!-- Collapse icon, show/hide based on section open state. -->
										<svg
											class="h-5 w-5 {minusState(yearState)}"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								</button>
							</h3>
							<!-- Filter section, show/hide based on section state. -->
							<div class="pt-6 {yearState}" id="filter-section-0">
								<div class="space-y-4">
									{#each yearFilterItems as item, idx}
										<div class="flex items-center">
											<input
												bind:checked={item.isSelected}
												id="filter-year-{idx}"
												name={item.name}
												value={item.name}
												type="checkbox"
												class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												on:click={filterSelectHandler}
											/>
											<label for="filter-year-{idx}" class="ml-3 text-sm text-gray-600"
												>{item.name}</label
											>
										</div>
									{/each}
									<!-- <div class="flex items-center">
								<input id="filter-color-0" name="year[]" value="white" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-color-0" class="ml-3 text-sm text-gray-600">White</label>
								</div>
								<div class="flex items-center">
								<input id="filter-color-1" name="year[]" value="beige" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-color-1" class="ml-3 text-sm text-gray-600">Beige</label>
								</div>
								<div class="flex items-center">
								<input id="filter-color-2" name="year[]" value="blue" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-color-2" class="ml-3 text-sm text-gray-600">Blue</label>
								</div> -->
								</div>
							</div>
						</div>
						<div class="border-b border-gray-200 py-6">
							<h3 class="-my-3 flow-root">
								<!-- Expand/collapse section button -->
								<button
									on:click={toggleCategory}
									type="button"
									class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
									aria-controls="filter-section-1"
									aria-expanded="false"
								>
									<span class="font-medium text-gray-900">Category</span>
									<span class="ml-6 flex items-center">
										<!-- Expand icon, show/hide based on section open state. -->
										<svg
											class="h-5 w-5 {plusState(categoryState)}"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
											/>
										</svg>
										<!-- Collapse icon, show/hide based on section open state. -->
										<svg
											class="h-5 w-5 {minusState(categoryState)}"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								</button>
							</h3>
							<!-- Filter section, show/hide based on section state. -->
							<div class="pt-6 {categoryState}" id="filter-section-1">
								<div class="space-y-4">
									{#each categoryFilterItems as item, idx}
										<div class="flex items-center">
											<input
												bind:checked={item.isSelected}
												id="filter-category-{idx}"
												name={item.name}
												value={item.name}
												type="checkbox"
												class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												on:click={filterSelectHandler}
											/>
											<label for="filter-category-{idx}" class="ml-3 text-sm text-gray-600"
												>{item.name}</label
											>
										</div>
									{/each}
									<!-- <div class="flex items-center">
								<input id="filter-category-0" name="category[]" value="new-arrivals" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-category-0" class="ml-3 text-sm text-gray-600">New Arrivals</label>
								</div>
								<div class="flex items-center">
								<input id="filter-category-1" name="category[]" value="sale" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-category-1" class="ml-3 text-sm text-gray-600">Sale</label>
								</div>
								<div class="flex items-center">
								<input id="filter-category-2" name="category[]" value="travel" type="checkbox" checked class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-category-2" class="ml-3 text-sm text-gray-600">Travel</label>
								</div> -->
								</div>
							</div>
						</div>
						<div class="border-b border-gray-200 py-6">
							<h3 class="-my-3 flow-root">
								<!-- Expand/collapse section button -->
								<button
									on:click={toggleTag}
									type="button"
									class="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
									aria-controls="filter-section-2"
									aria-expanded="false"
								>
									<span class="font-medium text-gray-900">Tags</span>
									<span class="ml-6 flex items-center">
										<!-- Expand icon, show/hide based on section open state. -->
										<svg
											class="h-5 w-5 {plusState(tagState)}"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
											/>
										</svg>
										<!-- Collapse icon, show/hide based on section open state. -->
										<svg
											class="h-5 w-5 {minusState(tagState)}"
											viewBox="0 0 20 20"
											fill="currentColor"
											aria-hidden="true"
										>
											<path
												fill-rule="evenodd"
												d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
												clip-rule="evenodd"
											/>
										</svg>
									</span>
								</button>
							</h3>
							<!-- Filter section, show/hide based on section state. -->
							<div class="pt-6 {tagState}" id="filter-section-2">
								<div class="space-y-4">
									{#each tagFilterItems as item, idx}
										<div class="flex items-center">
											<input
												bind:checked={item.isSelected}
												id="filter-tag-{idx}"
												name={item.name}
												value={item.name}
												type="checkbox"
												class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
												on:click={filterSelectHandler}
											/>
											<label for="filter-tag-{idx}" class="ml-3 text-sm text-gray-600"
												>{item.name}</label
											>
										</div>
									{/each}
									<!-- <div class="flex items-center">
								<input id="filter-size-0" name="tag[]" value="2l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-size-0" class="ml-3 text-sm text-gray-600">2L</label>
								</div>
								<div class="flex items-center">
								<input id="filter-size-1" name="tag[]" value="6l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-size-1" class="ml-3 text-sm text-gray-600">6L</label>
								</div>
								<div class="flex items-center">
								<input id="filter-size-2" name="tag[]" value="12l" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
								<label for="filter-size-2" class="ml-3 text-sm text-gray-600">12L</label>
								</div> -->
								</div>
							</div>
						</div>
					</form>

					<!-- Product grid -->
					<div class="lg:col-span-3">
						<!-- Your content -->
						<div class="space-y-16 divide-y divide-blue-300">
							{#each pagedPosts as blogPost}
								<BlogEntry {...blogPost} />
							{/each}
						</div>
						<!-- <Pagination /> -->
					</div>
				</div>
			</section>
		</main>
	</div>
</div>

<!-- <div class="overflow-hidden rounded-md border border-gray-300 bg-white">
	<ul role="list" class="divide-y divide-gray-300">
		{#each posts as post}
			<li class="px-6 py-4">
                <a href="/blog/{post.slug}" class="flex space-x-8">
                    <div class="text-2xl font-bold text-gray-600">{post.title}</div>
                </a>
                <p class="text-gray-400 text-sm">{prettyDate(post.postDate)}</p>
							</li>
		{/each}
	</ul>
</div> -->
