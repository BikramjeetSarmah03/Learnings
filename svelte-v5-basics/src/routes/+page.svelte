<script lang="ts">
	import Header from './header.svelte';

	let name = $state('bikram');
	let status: 'OPEN' | 'CLOSED' = $state('OPEN');

	// function toggle() {
	// 	status = status === 'OPEN' ? 'CLOSED' : 'OPEN';
	// }
	function onclick() {
		status = status === 'OPEN' ? 'CLOSED' : 'OPEN';
	}

	// <!-- Derived State -->
	let full_name = $derived(name + ' ' + 'India');
</script>

<Header {name} />

<div>
	<label for="name">From Page</label>
	<input type="text" bind:value={name} />
</div>

<p>This store is now {status}</p>
<button {onclick}> Toggle Status</button>

<!-- Derived State -->
<h2>
	{full_name}
</h2>

<h1>
	<a href="/template">Template Page</a>
</h1>
