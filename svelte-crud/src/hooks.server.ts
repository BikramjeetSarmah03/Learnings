import { auth } from '$lib/auth'; // path to your auth file
import type { Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const handle: Handle = async ({ event, resolve }) => {
	return svelteKitHandler({ event, resolve, auth });
};
