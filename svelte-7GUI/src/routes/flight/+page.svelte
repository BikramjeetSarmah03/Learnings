<script lang="ts">
	type Options = 'one-way' | 'return';

	function getDate() {
		const date = new Date();
		const [month, day, year] = date
			.toLocaleDateString('en-US', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit'
			})
			.split('/');

		return `${year}-${month}-${day}`;
	}

	let selected = $state<Options>('one-way');
	let startDate = $state(getDate());
	let returnDate = $state(getDate());

	function handleSubmit(e: Event) {
		e.preventDefault();

		alert(`Your have booked a ${selected} flight on ${startDate}`);
	}
</script>

<form onsubmit={handleSubmit} class="p-4 space-y-4">
	<select bind:value={selected} id="type" class="px-4 py-2 border">
		<option value="one-way">One-Way Flight</option>
		<option value="return">Return Flight</option>
	</select>

	<div class="space-x-4">
		<label for="date" class="px-4 py-2 border">Start Date</label>
		<input class="px-4 py-2 border" type="date" id="date" bind:value={startDate} min={getDate()} />
	</div>

	<div>
		<label for="edate" class="px-4 py-2 border">End Date</label>
		<input
			class="px-4 py-2 border disabled:bg-gray-100"
			type="date"
			id="edate"
			min={getDate()}
			bind:value={returnDate}
			disabled={selected === 'one-way'}
		/>
	</div>

	<button
		type="submit"
		class="w-40 px-4 py-2 border disabled:bg-gray-200"
		disabled={!startDate || (selected === 'return' && returnDate < startDate)}>Book</button
	>
</form>
