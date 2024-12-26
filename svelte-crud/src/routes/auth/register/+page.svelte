<script lang="ts">
	import { Loader2 } from 'lucide-svelte';
	import {
		Card,
		CardHeader,
		CardDescription,
		CardTitle,
		CardContent
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	import { authClient } from '$lib/auth-client';

	let loading = false;

	const values = $state({
		name: '',
		email: '',
		password: ''
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		authClient.signUp
			.email({
				name: values.name,
				email: values.email,
				password: values.password
			})
			.then((data: any) => {
				if (data.data) {
					goto('/');
					toast('Successfully Registered');
				} else {
					toast(data.error.message);
				}
			})
			.catch(() => {
				toast('Error while register');
			})
			.finally(() => {});
	}
</script>

<Card class="max-w-md">
	<CardHeader>
		<CardTitle class="text-lg md:text-xl">Sign UP</CardTitle>

		<CardDescription class="text-xs md:text-sm">
			Enter your email below to register to your account
		</CardDescription>
	</CardHeader>

	<CardContent>
		<form onsubmit={handleSubmit} class="grid gap-4">
			<div class="grid gap-2">
				<Label for="name">Name</Label>

				<Input id="name" placeholder="example" required bind:value={values.name} />
			</div>

			<div class="grid gap-2">
				<Label for="email">Email</Label>

				<Input
					id="email"
					type="email"
					placeholder="m@example.com"
					required
					bind:value={values.email}
				/>
			</div>

			<div class="grid gap-2">
				<Label for="password">Password</Label>

				<Input
					id="password"
					type="password"
					placeholder="password"
					autocomplete="new-password"
					bind:value={values.password}
				/>
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{#if loading}
					<Loader2 class="animate-spin" size="20" />
				{:else}
					Register
				{/if}
			</Button>

			<p>
				Already have account ?
				<a href="/auth/login">Login</a>
			</p>
		</form>
	</CardContent>
</Card>
