import { z } from "zod";

export const signupSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string().email('Enter valid email'),
  role: z.enum(['buyer', 'seller', 'admin', 'subadmin']),
  password: z.string().min(6, 'Password must be at least 6 characters').max(100, 'Password is too long'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signupSchema>;