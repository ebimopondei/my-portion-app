import { z } from "zod"
import { Status } from "../enums"

export const productSchema = z.object( {
    seller_id: z.string().optional(),
    name: z.string(),
    status: z.enum([Status.Pending, Status.Delivered, Status.Cancelled]),
    description: z.string(),
    image_url: z.string(),
    total_quantity: z.number(),
    quantity_unit: z.string(),
    portion_size: z.number(),
    price_per_portion: z.number(),
    available_portions: z.number(),
    location: z.string()
})

export type ProductSchema = z.infer<typeof productSchema>