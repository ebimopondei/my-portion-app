import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email('Enter valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
}).required();

export type loginUserDto = z.infer<typeof loginUserSchema>;
export type LoginSchema = z.infer<typeof loginUserSchema>
