<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';

	let { children } = $props();

	const ROUTES = [
		{
			name: 'Counter',
			link: '/counter'
		},
		{
			name: 'Temperature Converter',
			link: '/temperater'
		},
		{
			name: 'Flight Booker',
			link: '/flight'
		},
		{
			name: 'Timer',
			link: '/timer'
		},
		{
			name: 'CRUD',
			link: '/crud'
		},
		{
			name: 'Circle Drawer',
			link: '/circle'
		},
		{
			name: 'Cells',
			link: '/cells'
		}
	];
</script>

<main class="flex w-full h-screen gap-4">
	<aside class="flex flex-col p-4 pl-8 border-r w-fit">
		<ul class="flex flex-col gap-4 list-decimal text-nowrap">
			{#each ROUTES as route (route.link)}
				<li>
					<a href={route.link} class:font-bold={$page.url.pathname === route.link}>{route.name}</a>
				</li>
			{/each}
		</ul>
	</aside>
	<section class="grow">
		{@render children()}
	</section>
</main>
