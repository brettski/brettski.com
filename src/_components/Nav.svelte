<script>
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let pathname = '';

	$: pathname = $page.url.pathname;
	console.log('pathname', pathname);
	console.log('page.url.pathname', $page.url.pathname);

	let menuIsOpen = false;
	let profileIsOpen = false;

	function menuButtonHandler() {
		menuIsOpen = !menuIsOpen;
	}
	function profileButtonHandler() {
		profileIsOpen = !profileIsOpen;
	}
	function handleClickOutsideProfileMenu({ target }) {
		if (!target.closest('#user-menu-button')) {
			profileIsOpen = false;
		}
	}

	onMount(() => {
		window.addEventListener('click', handleClickOutsideProfileMenu);
		return () => {
			window.removeEventListener('click', handleClickOutsideProfileMenu);
		};
	});
</script>

<nav class="bg-white shadow">
	<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
		<div class="relative flex h-16 justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button -->
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={menuButtonHandler}
				>
					<span class="sr-only">Open main menu</span>
					<!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
					<svg
						class="{!menuIsOpen ? 'block' : 'hidden'} h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
						/>
					</svg>
					<!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
					<svg
						class="{menuIsOpen ? 'block' : 'hidden'} h-6 w-6"
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
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="flex flex-shrink-0 items-center">
					<img class="block h-8 w-auto lg:hidden" src="/brettski_bt.svg" alt="Your Company" />
					<img class="hidden h-8 w-auto lg:block" src="/brettski_bt.svg" alt="Your Company" />
				</div>
				<div class=" sm:ml-6 sm:flex sm:space-x-8">
					<!-- Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
					<a
						href="/"
						class="{pathname === '/'
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
						>Home</a
					>
					<a
						href="/blog"
						class="{pathname.includes('/blog')
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
						>Blog</a
					>
					<a
						href="/tools"
						class="{pathname.includes('/tools')
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
						>Tools</a
					>
					<a
						href="/about"
						class="{pathname.includes('/about')
							? 'border-indigo-500 text-gray-900'
							: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
						>About</a
					>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<button
					type="button"
					class="rounded-full bg-white p-1 text-gray-400 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
				>
					<span class="sr-only">View notifications</span>
					<svg
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
						/>
					</svg>
				</button>

				<!-- Profile dropdown -->
				<div class="relative ml-3 profile-menu">
					<div>
						<button
							type="button"
							class="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							id="user-menu-button"
							aria-expanded="false"
							aria-haspopup="true"
							on:click={profileButtonHandler}
						>
							<span class="sr-only">Open user menu</span>
							<img
								class="h-8 w-8 rounded-full"
								src="/images/bryan-goff-RF4p4rTM-2s-unsplash_256.jpg"
								alt=""
							/>
						</button>
					</div>
					<!--
					Dropdown menu, show/hide based on menu state.

					Entering: "transition ease-out duration-200"
					From: "transform opacity-0 scale-95"
					To: "transform opacity-100 scale-100"
					Leaving: "transition ease-in duration-75"
					From: "transform opacity-100 scale-100"
					To: "transform opacity-0 scale-95"
					-->
					{#if profileIsOpen}
						<div
							class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1"
							in:fade={{ duration: 200 }}
							out:fade={{ duration: 200 }}
						>
							<!-- Active: "bg-gray-100", Not Active: "" -->
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-0">Your Profile</a
							>
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-1">Settings</a
							>
							<a
								href="#"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								role="menuitem"
								tabindex="-1"
								id="user-menu-item-2">Sign out</a
							>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	<div class="{menuIsOpen ? 'block' : 'hidden'} sm:hidden" id="mobile-menu">
		<div class="space-y-1 pb-4 pt-2">
			<!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" -->
			<a
				href="/"
				class="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700"
				>Home</a
			>
			<a
				href="/blog"
				class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
				>Blog</a
			>
			<a
				href="/tools"
				class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
				>Tools</a
			>
			<a
				href="/about"
				class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
				>About</a
			>
			<!-- <a href="#" class="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700">Calendar</a> -->
		</div>
	</div>
</nav>
