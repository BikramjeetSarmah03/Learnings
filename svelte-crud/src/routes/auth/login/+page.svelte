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
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';

	import { authClient } from '$lib/auth-client';
	import { goto } from '$app/navigation';

	let loading = $state(false);

	const values = $state({
		email: '',
		password: '',
		rememberMe: false
	});

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		loading = true;
		authClient.signIn
			.email({
				email: values.email,
				password: values.password,
				rememberMe: values.rememberMe
			})
			.then((data: any) => {
				if (data.data) {
					toast('Successfully Logged In');
					return goto('/');
				} else {
					toast(data.error.message);
				}
			})
			.catch(() => {
				toast('Error while signing in');
			})
			.finally(() => {
				loading = false;
			});
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

				<Input
					id="email"
					type="email"
					placeholder="m@example.com"
					required
					bind:value={values.email}
				/>
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
					bind:value={values.password}
				/>
			</div>

			<div class="flex items-center gap-2">
				<Checkbox
					id="remember"
					checked={values.rememberMe}
					onCheckedChange={() => (values.rememberMe = !values.rememberMe)}
				/>

				<Label for="remember">Remember me</Label>
			</div>

			<Button type="submit" class="w-full" disabled={loading}>
				{#if loading}
					<Loader2 class="animate-spin" size="20" />
				{:else}
					Login
				{/if}
			</Button>

			<p>
				Don't have account ?
				<a href="/auth/register">Register</a>
			</p>
		</form>
	</CardContent>
</Card>
