import { useTranslations } from "next-intl";
import { z } from "zod/v4";

export function useFormTwoFactorSchema() {
    const t = useTranslations("zod");

    return z.object({
        code: z.string().min(1, t("required")).max(6, t("required")),
    });
}

export type FormTwoFactorSchema = z.infer<ReturnType<typeof useFormTwoFactorSchema>>;
