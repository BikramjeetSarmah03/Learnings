<script lang="ts">
	type Person = {
		name: string;
		surname: string;
	};

	let people = $state<Person[]>([
		{
			name: 'Biku',
			surname: 'Sarmah'
		},
		{
			name: 'Deep',
			surname: 'Bhattacharyya'
		}
	]);

	let selected = $state<Person>();
	let person = $state({ name: '', surname: '' });

	let search = $state('');
	const filteredPeople = $derived(
		search ? people.filter((p) => p.name.toLowerCase().startsWith(search.toLowerCase())) : people
	);

	$effect(() => {
		person = {
			name: selected?.name ?? '',
			surname: selected?.surname ?? ''
		};
	});

	function createPerson() {
		people.push(person);
		clearFields();
	}

	function updatePerson() {
		const index = people.indexOf(selected!);
		people[index] = { name: person.name, surname: person.surname };
	}

	function deletePerson() {
		people = people.filter((p) => p.name !== person.name || p.surname !== person.surname);
		clearFields();
	}

	function clearFields() {
		person = { name: '', surname: '' };
	}
</script>

<div class="p-4">
	<h1>CRUD</h1>

	<div class="grid grid-cols-2 gap-4 mt-4">
		<div class="w-full space-y-4">
			<div class="w-full">
				<label for="filter">Filter </label>
				<input
					type="text"
					class="w-full px-4 py-2 border"
					placeholder="Filter"
					bind:value={search}
				/>
			</div>

			<select class="w-full p-4 border" bind:value={selected} size="5">
				{#each filteredPeople as person}
					<option value={person}>{person.name}, {person.surname}</option>
				{/each}
			</select>
		</div>

		<div class="space-y-4">
			<div class="w-full">
				<label for="name">Name</label>
				<input
					type="text"
					class="w-full px-4 py-2 border"
					placeholder="Name"
					bind:value={person.name}
				/>
			</div>
			<div class="w-full">
				<label for="surname">Surname</label>
				<input
					type="text"
					class="w-full px-4 py-2 border"
					placeholder="Surname"
					bind:value={person.surname}
				/>
			</div>
		</div>

		<div>
			<button onclick={createPerson} class="w-24 px-4 py-2 border">Create</button>
			<button onclick={updatePerson} class="w-24 px-4 py-2 border">Update</button>
			<button onclick={deletePerson} class="w-24 px-4 py-2 border">Delete</button>
		</div>
	</div>
</div>
