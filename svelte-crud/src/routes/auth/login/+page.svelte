<script lang="ts">
	import {
		Card,
		CardHeader,
		CardDescription,
		CardTitle,
		CardContent
	} from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';

	import { Loader2 } from 'lucide-svelte';

	let loading = false;

	const values = $state({
		email: '',
		password: '',
		remeberMe: false
	});

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		console.log({ values });
	}
</script>

<Card class="max-w-md">
	<CardHeader>
		<CardTitle class="text-lg md:text-xl">Sign In</CardTitle>

		<CardDescription class="text-xs md:text-sm">
			Enter your email below to login to your account
		</CardDescription>
	</CardHeader>

	<CardContent>
		<form onsubmit={handleSubmit} class="grid gap-4">
			<div class="grid gap-2">
				<Label for="email">Email</Label>

				<Input id="email" type="email" placeholder="m@example.com" required />
			</div>

			<div class="grid gap-2">
				<div class="flex items-center">
					<Label for="password">Password</Label>

					<a href="/" class="inline-block ml-auto text-sm underline"> Forgot your password? </a>
				</div>

				<Input
					id="password"
					type="password"
					placeholder="password"
					autocomplete="new-password"
					value={values.password}
				/>
			</div>

			<div class="flex items-center gap-2">
				<Checkbox id="remember" value={String(values.remeberMe)} />

				<Label for="remember">Remember me</Label>
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{#if loading}
					<Loader2 class="animate-spin" size="20" />
				{:else}
					Login
				{/if}
			</Button>
		</form>
	</CardContent>
</Card>
