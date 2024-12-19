<script lang="ts">
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const { data: sessionData } = data;

	async function handleLogout() {
		await authClient
			.signOut()
			.then(() => {
				goto('/auth/login');
				toast('Successfully Logged Out');
			})
			.catch(() => {
				toast('Something went wrong');
			});
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

{sessionData?.user.name}

<Button onclick={handleLogout}>Logout</Button>
