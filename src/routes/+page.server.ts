import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { z } from 'zod';
import database from '$lib/server/database';
import dayjs from 'dayjs'

const urlDataSchema = z.object({
	url: z.string().trim().min(1, "Url is required").or(z.string().trim().url("Invalid  url format")),
    expiry: z.string().trim().regex(/^[0-9][d,w,m,y]$/, "Invalid expiry format").optional()
    .or(z.literal('')),
});

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();
        const formData = Object.fromEntries(data);
		const urlData = urlDataSchema.safeParse(formData);

        if (!urlData.success) {
            // Loop through the errors array and create a custom errors array
            const errors = urlData.error.errors.map((error) => {
                return {
                    field: error.path[0],
                    message: error.message
                };
            });
            
            return fail(400, { error: true, errors });
        }
        let document = {
            ...formData,
            "expiresAt": convertDate(formData.expiry.toString() || "1d"),
            "slug": generateSlug()
        }
        await database.insertOne(document)
        return {success: true, link: buildLink(request.url, document.slug)}
    }
        
};

function generateSlug(): string {
    let chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    let result = '';
    for (var i = 6; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
function convertDate(expiry: string): Date {
    let duration = +expiry.substring(0,1);
    let period = expiry.substring(1,2) as dayjs.ManipulateType
    return dayjs().add(duration, period).toDate()
}

function buildLink(url: string, slug: string): string {
    return `${url}${slug}`
}

