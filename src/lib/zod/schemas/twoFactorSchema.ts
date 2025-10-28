import { useTranslations } from "next-intl";
import { z } from "zod/v4";

export function useCodeTwoFactorSchema() {
	const t = useTranslations("zod");

	return z.object({
		code: z.string().min(1, t("required")),
	});
}

export type CodeTwoFactorSchema = z.infer<
	ReturnType<typeof useCodeTwoFactorSchema>
>;

export function useTypeTwoFactorSchema() {
	const t = useTranslations("zod");

	return z.object({
		typeTwoFactor: z.enum(["otp", "totp"], t("required")),
	});
}

export type TypeTwoFactorSchema = z.infer<
	ReturnType<typeof useTypeTwoFactorSchema>
>;
