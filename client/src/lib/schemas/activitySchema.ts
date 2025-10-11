import {z} from 'zod';

export const activitySchema = z.object({
    title: z.string().nonempty('Title is required'),
    description: z.string().nonempty('Description is required'),
    category: z.string().nonempty('Category is required'),
    date: z.string().nonempty('Date is required'),
    city: z.string().nonempty('City is required'),
    venue: z.string().nonempty('Venue is required'),
})

export type ActivitySchema = z.infer<typeof activitySchema>;