import { z } from "zod";

export const checkOutSchema = z.object({
  street_address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  delivery_note: z.string().optional(),
  
})

export type CheckOutSchema = z.infer<typeof checkOutSchema>;