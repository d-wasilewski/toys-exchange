import { z } from "zod";
import { TranslationFunctions } from "../../i18n/i18n-types";

export const schema = (LL: TranslationFunctions) =>
  z.object({
    email: z
      .string()
      .min(1, { message: LL.validation.required() })
      .email({ message: LL.validation.invalidEmail() })
      .max(150, { message: LL.validation.maximum({ max: 150 }) }),
    password: z
      .string()
      .min(1, { message: LL.validation.required() })
      .min(8, { message: LL.validation.minimum({ min: 8 }) })
      .max(100, { message: LL.validation.maximum({ max: 100 }) }),
  });
