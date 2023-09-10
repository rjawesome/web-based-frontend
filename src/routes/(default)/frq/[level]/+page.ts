import { error } from '@sveltejs/kit';
import { SERVER } from '$lib/vars.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let id = params.level;
    let isMarkdown = true;
    
    return {
		id,
	};
}
