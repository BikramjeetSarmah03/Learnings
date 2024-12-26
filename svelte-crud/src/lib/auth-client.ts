import { createAuthClient } from 'better-auth/svelte';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000'
});
