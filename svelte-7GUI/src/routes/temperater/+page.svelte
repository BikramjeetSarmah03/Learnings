<script lang="ts">
	class Temperature {
		// private variables
		#c = $state(0);
		#f = $state(0);

		get c() {
			return this.#c;
		}

		set c(newValue) {
			this.#c = newValue;
			this.#f = newValue * (9 / 5) + 32;
		}

		get f() {
			return this.#f;
		}

		set f(newValue) {
			this.#f = newValue;
			this.#c = (newValue - 32) * (5 / 9);
		}
	}

	const temperature = new Temperature();
</script>

<div class="p-4">
	<h1>Temperature Converter</h1>

	<div class="flex flex-col gap-4 mt-4">
		<div class="flex gap-4">
			<input
				type="text"
				placeholder="Celcius"
				class="px-4 py-2 border max-w-[10ch]"
				bind:value={temperature.c}
			/>
			<button class="w-40 px-4 py-2 border">Celcius</button>
		</div>
		<div class="flex gap-4">
			<input
				type="text"
				placeholder="Fahrenheit"
				class="px-4 py-2 border max-w-[10ch]"
				bind:value={temperature.f}
			/>
			<button class="w-40 px-4 py-2 border">Fahrenheit</button>
		</div>
	</div>
</div>
