import { z } from "zod";

export const schema = z.object({
  name: z.string().min(2, { message: "Name should have at least 2 letters" }),
});
