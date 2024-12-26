import { json } from '@sveltejs/kit';

export async function GET() {
	const number = Math.random() * 1000;
	return json(number);
}
