import { z } from "zod";
import { TranslationFunctions } from "../../../i18n/i18n-types";

export const schema = (LL: TranslationFunctions) =>
  z
    .object({
      password: z
        .string()
        .min(8, { message: LL.validation.minimum({ min: 8 }) }),
      confirmPassword: z.string().min(8, { message: LL.validation.required() }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: LL.validation.passwordMismatch(),
      path: ["confirmPassword"],
    });
