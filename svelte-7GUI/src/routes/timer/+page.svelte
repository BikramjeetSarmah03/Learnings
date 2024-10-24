<script lang="ts">
	let elapsed = $state(0);
	let duration = $state(5);

	let interval: number;

	function start() {
		interval = setInterval(() => {
			elapsed += 0.1;

			if (elapsed > duration) {
				elapsed = duration;
				clearInterval(interval);
			}
		}, 100);
	}

	function reset() {
		elapsed = 0;
		start();
	}

	$effect(() => {
		if (!duration) return;

		start();

		return () => clearInterval(interval);
	});
</script>

<div class="p-4 space-y-4">
	<h1>Timer</h1>

	<div>
		<h1>Elapsed Time</h1>
		<progress max={duration} value={elapsed}></progress>

		<h3>{elapsed.toFixed(1) ?? 0}s</h3>
	</div>

	<h1>
		Time:
		<input type="range" class="border" bind:value={duration} min="1" max="10" />
	</h1>

	<button onclick={reset} class="w-40 px-4 py-2 border">Reset</button>
</div>
