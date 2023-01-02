import database from '$lib/server/database';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    let slug: string = params.slug;
    let document = await database.findOne({
        slug
    }, {projection: {_id: 0, url: 1}})
    if (document == null)
        throw error(404, 'Not found');
    return {
        url: document.url
    }
  
}) satisfies PageServerLoad;