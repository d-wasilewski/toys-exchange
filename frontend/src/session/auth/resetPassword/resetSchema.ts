import { z } from "zod";

export const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password should have at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "This field is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords doesn't match",
    path: ["confirmPassword"],
  });
