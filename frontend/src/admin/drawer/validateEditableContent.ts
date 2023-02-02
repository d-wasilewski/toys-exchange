import { z } from "zod";
import { TranslationFunctions } from "../../i18n/i18n-types";

export const schema = (LL: TranslationFunctions) =>
  z.object({
    name: z
      .string()
      .min(1, { message: LL.validation.required() })
      .max(25, { message: LL.validation.maximum({ max: 25 }) }),
    email: z
      .string()
      .min(1, { message: LL.validation.required() })
      .email({ message: LL.validation.invalidEmail() }),
    phoneNumber: z
      .string()
      .min(1, { message: LL.validation.required() })
      .regex(/^\d{9}$/, { message: LL.validation.invalidPhone() }),
    status: z.enum(["ACTIVE", "BLOCKED"]),
    role: z.enum(["BASIC", "ADMIN"]),
  });
