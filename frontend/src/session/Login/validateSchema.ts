import { z } from "zod";

export const schema = z.object({
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email" })
    .max(150, { message: "Email is too long" }),
  password: z
    .string()
    .min(1, { message: "This field is required" })
    .max(100, { message: "Password is too long" }),
});
