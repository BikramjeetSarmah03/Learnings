<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		name,
		fake_name,
		children,
		secondChild
	}: {
		name: string;
		children?: Snippet;
		secondChild?: Snippet;
		fake_name?: string | null;
	} = $props();

	import { createState, BikramState } from './state.svelte';

	const myState = createState();
	const myStateTwo = new BikramState();
</script>

<button onclick={myState.up}>{myState.value}</button>
<button onclick={() => myStateTwo.up()}>{myStateTwo.value}</button>

<h1>Hello from <span>{name}</span></h1>

<h2>{name.length}</h2>

<div>
	<label for="name">From Header</label>
	<input type="text" bind:value={name} />
</div>

<h3>Fake Name: {fake_name ?? 'No Fake Name'}</h3>

{#if children}
	<div>From Children Passed: {@render children()}</div>

	<!-- {#if secondChild}
		<h3>Second child {@render secondChild('From Second Child')}</h3>
	{/if} -->
{/if}

<style>
	h1 > span {
		color: red;
		text-transform: capitalize;
	}
</style>
