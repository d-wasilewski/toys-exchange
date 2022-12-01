import { z } from "zod";

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: "This field is required" })
    .max(25, { message: "Name should have maximum 25 letters" }),
  category: z.string().min(1, { message: "This field is required" }),
  // TODO
  //   status: z.enum(["ACTIVE", "BLOCKED"]),
  description: z
    .string()
    .min(1, { message: "This field is required" })
    .max(500, "Description should have less than 500 letters"),
});
