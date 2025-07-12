import { z } from "zod"

export const productSchema = z.object( {
    seller_id: z.string(),
    name: z.string(),
    description: z.string(),
    image_url: z.string(),
    total_quantity: z.number(),
    portion_size: z.number(),
    price_per_portion: z.number(),
    available_portions: z.number(),
    location: z.string()
})

export type ProductSchema = z.infer<typeof productSchema>