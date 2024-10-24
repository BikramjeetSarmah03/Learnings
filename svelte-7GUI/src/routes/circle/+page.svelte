<script lang="ts">
	type Cirlce = {
		id: string;
		cx: number;
		cy: number;
		r: number;
	};

	type Status = 'drawing' | 'editing';

	let status = $state<Status>('drawing');
	let circles = $state<Cirlce[]>([]);
	let selected = $state<Cirlce>()!;

	let snapshots: Cirlce[][] = [];
	let history = $state(-1);

	function drawCicle(e: MouseEvent) {
		if (status === 'editing') {
			snapshot();

			status = 'drawing';
			return;
		}
		const svgEl = e.target as SVGElement;
		const { left, top } = svgEl.getBoundingClientRect();

		const circle = {
			id: window.crypto.randomUUID(),
			cx: +(e.clientX - left).toFixed(),
			cy: +(e.clientY - top).toFixed(),
			r: 40
		};

		circles.push(circle);
		selected = circle;

		snapshot();
	}

	function undo() {
		if (history === -1) return;
		circles = snapshots[--history];
	}

	function redo() {
		if (history === snapshots.length - 1) return;
		circles = snapshots[++history];
	}

	function snapshot() {
		history++;
		snapshots.push($state.snapshot(circles));
	}
</script>

<div class="p-4">
	<h1>Circle</h1>

	<div class="mt-4">
		<div class="flex gap-4">
			<button class="w-24 px-4 py-2 border" onclick={undo} disabled={history === -1}>Undo</button>
			<button
				class="w-24 px-4 py-2 border"
				onclick={redo}
				disabled={history === snapshots.length - 1}>Redo</button
			>
		</div>

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<svg onclick={drawCicle} viewBox="0 0 600 400" class="mt-4 border">
			{#each circles as circle}
				<circle
					{...circle}
					fill={selected?.id === circle.id ? '#444' : '#000'}
					stroke="#fff"
					stroke-width="2"
					onclick={(e) => {
						e.stopPropagation();
						selected = circle;
					}}
					oncontextmenu={(e) => {
						if (status === 'editing') {
							snapshot();
						}

						e.preventDefault();
						status = 'editing';
						selected = circle;
					}}
				></circle>
			{/each}
		</svg>

		{#if status === 'editing'}
			<div class="adjust surface-2 space-y">
				<span>Ajust diameter of circle at ({selected?.cx}, {selected?.cy})</span>
				<input type="range" bind:value={selected.r} />
			</div>
		{/if}
	</div>
</div>

<style>
	.adjust {
		width: 400px;
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		padding: var(--size-3);
		text-align: center;
	}
</style>
