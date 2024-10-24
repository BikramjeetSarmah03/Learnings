<script lang="ts">
	let count = $state(0);
</script>

<div class="p-4">
	<input class="px-4 py-2 border" type="text" bind:value={count} disabled />
	<button
		class="w-40 px-4 py-2 bg-blue-500"
		onclick={() => {
			count += 1;
		}}>{count}</button
	>
</div>
