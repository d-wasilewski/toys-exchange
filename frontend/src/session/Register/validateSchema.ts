import { z } from "zod";
import { TranslationFunctions } from "../../i18n/i18n-types";

export const schema = (LL: TranslationFunctions) =>
  z
    .object({
      name: z
        .string()
        .min(1, { message: LL.validation.required() })
        .max(25, { message: LL.validation.maximum({ max: 25 }) }),
      email: z
        .string()
        .min(1, { message: LL.validation.required() })
        .email({ message: LL.validation.invalidEmail() }),
      phoneNumber: z.string().min(1, { message: LL.validation.required() }),
      //   .regex(/^\d{9}$/, { message: "Invalid phone number" }),
      address: z
        .string()
        .max(69, { message: LL.validation.maximum({ max: 69 }) }),
      password: z.string().min(1, { message: LL.validation.required() }),
      confirmPassword: z.string().min(1, { message: LL.validation.required() }),
      terms: z.boolean(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: LL.validation.passwordMismatch(),
      path: ["confirmPassword"],
    });
