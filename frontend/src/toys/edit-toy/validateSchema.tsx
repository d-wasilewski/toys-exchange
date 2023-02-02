import { z } from "zod";
import { TranslationFunctions } from "../../i18n/i18n-types";

export const schema = (LL: TranslationFunctions) =>
  z.object({
    name: z
      .string()
      .min(1, { message: LL.validation.required() })
      .max(25, { message: LL.validation.maximum({ max: 25 }) }),
    category: z.string().min(1, { message: LL.validation.required() }),
    // TODO
    //   status: z.enum(["ACTIVE", "BLOCKED"]),
    description: z
      .string()
      .min(1, { message: LL.validation.required() })
      .max(500, { message: LL.validation.maximum({ max: 500 }) }),
  });
