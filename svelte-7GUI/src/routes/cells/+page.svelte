<script lang="ts">
	const rows = 10;
	const cols = 10;
	const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	const data = $state([
		[{ value: 'Item' }, { value: 'Price' }, { value: 'Amount' }, { value: 'Total' }],
		[{ value: 'Banana' }, { value: '1' }, { value: '4' }, { value: '=MULTIPLY(B2,C2)' }],
		[{ value: 'Apple' }, { value: '2' }, { value: '2' }, { value: '=MULTIPLY(B3,C3)' }],
		[{ value: '' }, { value: '' }, { value: 'Total' }, { value: '=SUM(D2,D3)' }]
	]);

	let selectedCell = $state();
	let editedCell = $state();

	function parseValue(value: string): string | number {
		if (value.startsWith('=')) {
			const { operation, cells } = parseFormula(value);

			const values = cells.map(({ row, col }) => {
				const value = data[row][col].value;
				if (value.startsWith('=')) {
					return +parseValue(value);
				}
				return +value;
			});

			return values.reduceRight(
				(total, value) => {
					if (operation === 'SUM') return total + value;
					if (operation === 'MULTIPLY') return total * value;
					return total;
				},
				operation === 'MULTIPLY' ? 1 : 0
			);
		}

		return value;
	}

	function parseFormula(value: string) {
		// =MULTIPLY(B2,C2)
		const [a, b] = value.split('(');
		const operation = a.split('=')[1];
		const cells = b.replace(')', '').split(',');

		return { operation, cells: cells.map(cellNameToIndex) };
	}

	function cellNameToIndex(value: string) {
		// A1 -> 00 -> data[0][0]
		const [col, ...row] = value.split('');
		return { row: +row.join('') - 1, col: letters.indexOf(col) };
	}

	function update(e: Event) {
		const { value, parentElement } = e.target as HTMLInputElement;
		const { row, col } = cellNameToIndex(parentElement!.dataset.cell!);

		if (data[row]) {
			if (data[row][col]) {
				data[row][col].value = value;
			} else {
				data[row][col] = { value };
			}
		} else {
			data[row] = [];
			data[row][col] = { value };
		}
	}
</script>

<div class="p-4">
	<h1>Cells</h1>

	<div class="mt-4">
		<table class="w-full max-w-[800px]">
			<thead>
				<tr>
					<th></th>
					{#each Array(rows) as _, i}
						<th>{letters[i]}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each Array(rows) as _, i}
					<tr>
						<th>{i + 1}</th>
						{#each Array(cols) as _, j}
							{@const cell = `${letters[j]}${i + 1}`}
							{@const value = data[i]?.[j]?.value}
							{@const selected = selectedCell === cell}
							{@const parsedValue = value ? parseValue(value) : ''}
							{@const editing = editedCell === cell}
							<td
								class:selected
								data-cell={cell}
								onclick={() => {
									if (selected) return;
									selectedCell = cell;
									editedCell = null;
								}}
								ondblclick={() => (editedCell = cell)}
							>
								{#if editing}
									<input type="text" {value} oninput={update} autofocus />
								{:else}
									<span>{parsedValue}</span>
								{/if}
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	table {
		max-width: 800px;
	}

	td {
		width: 160px;
		height: 40px;
		font-weight: 600;
		text-align: left;
		border: 1px solid black;
		padding: 4px 10px;

		&.selected {
			border: 2px solid black;
		}

		input {
			height: 100%;
			padding: 0px;
			background: none;
			outline: none;
		}
	}

	th {
		border: 1px solid black;
		padding: 4px 8px;
	}
</style>
