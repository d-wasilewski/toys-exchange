import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(25, { message: "Name should have maximum 25 letters" }),
  email: z
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email" }),
  phoneNumber: z
    .string()
    .min(1, { message: "This field is required" })
    .regex(/^\d{9}$/, { message: "Invalid phone number" }),
  address: z.string().max(69, "Address should have less than 69 letters"),
});
