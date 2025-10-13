import { useTranslations } from "next-intl";
import { z } from "zod/v4";

export function useFormLoginSchema() {
  const t = useTranslations("zod");

  return z.object({
    email: z.email(t("email.invalid")),
    password: z.string().min(1, t("required")),
    rememberMe: z.boolean().default(false).optional(),
  });
}

export type FormLoginSchema = z.infer<ReturnType<typeof useFormLoginSchema>>;
