<script lang="ts">
	import { fly } from 'svelte/transition';

	let formState = $state({
		answers: {},
		step: 0,
		error: ''
	});

	const QUESTIONS = [
		{
			question: 'What is your name',
			id: 'name',
			type: 'text'
		},
		{
			question: 'What is your birthday',
			id: 'birthday',
			type: 'date'
		},
		{
			question: 'What is your color',
			id: 'color',
			type: 'color'
		}
	];

	function nextStep(id: string) {
		if (formState.answers[id]) {
			formState.step += 1;
			formState.error = '';
		} else {
			formState.error = 'Please fill out the form input';
		}
	}

	// DON'T create state based off other state, in effect
	// use $derived()

	// on mount
	$effect(() => {
		console.count('mount');

		return () => {
			// on unmount / destroyed
			// before effect re-run
			console.count('unmount');
		};
	});

	$effect(() => {
		// this will re run when formstate.step has changed
		console.log('form state: ', formState.step);

		return () => {
			// on unmount / destroyed
			// before formstate re run
			console.log('before formstate reruns: ', formState.step);
		};
	});

	// to inspect any value, it have init and update
	$inspect(formState.step);
</script>

<main>
	<p>
		{#if formState.step >= QUESTIONS.length}
			<span>Thank you</span>
		{:else}
			<span>Step: {formState.step}</span>
		{/if}
	</p>

	<h1>Name: {formState.answers?.name || 'User'}</h1>

	{#if formState.error}
		<p class="error">{formState.error}</p>
	{/if}

	<!-- {#if formState.step === 0}
		<div>
			<label for="name">Your name</label>
			<input type="text" id="name" bind:value={formState.name} />
		</div>

		<button
			onclick={() => {
				if (formState.name !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Your name is empty. Please write your name';
				}
			}}>Next</button
		>
	{:else if formState.step === 1}
		<div>
			<label for="bday">Your Birthday</label>
			<input type="date" id="bday" bind:value={formState.birthday} />
		</div>

		<button
			onclick={() => {
				if (formState.birthday !== '') {
					formState.step += 1;
					formState.error = '';
				} else {
					formState.error = 'Your birthday is empty. Please write your birthday';
				}
			}}>Next</button
		>
	{:else}
		<div>
			Your name is {formState.name}. Birthday: {formState.birthday}
		</div>
	{/if} -->

	{@render formStep({ question: "What's your name", id: 'name', type: 'text' })}

	<!-- <Header name={formState.name}>
		<p>Hello</p>

		{#snippet secondChild(name)}
			<p>Second Child: {name}</p>
		{/snippet}
	</Header> -->

	<!-- loop -->
	<!-- {#each QUESTIONS as question (question.id)} -->
	{#each QUESTIONS as { id, question, type }, index (id)}
		{#if formState.step === index}
			<div
				in:fly={{
					x: 200,
					duration: 300,
					opacity: 0,
					delay: 200
				}}
				out:fly={{
					x: -200,
					duration: 300,
					opacity: 0
				}}
			>
				{@render formStep({ question: question, id: id, type: type })}
			</div>
		{/if}
	{/each}

	{JSON.stringify(formState.answers)}
</main>

<!-- snippets / reusable code / children  -->
{#snippet formStep({ id, question, type }: { id: string; question: string; type: string })}
	<article>
		<div>
			<label for={id}>{question}</label>
			<input {type} {id} bind:value={formState.answers[id]} />
		</div>
		<button onclick={() => nextStep(id)}>Next</button>
	</article>
{/snippet}

<style>
	.error {
		color: red;
	}

	/* styles are scoped */
	/* to make globals do below */
	/* :global(div) {
		background-color: blue;
	} */
</style>
