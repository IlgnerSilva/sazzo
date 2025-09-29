"use server";

import { z } from "zod/v4";
import { getInjection } from "@/core/di/container";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";

export const verifyTwoFactor = actionClient
	.inputSchema(
		z.object({
			code: z.string().min(6).max(6),
			type: z.enum(["totp", "otp"], { error: "Tipo de verificação inválido" }),
		}),
	)
	.action(async ({ parsedInput: { code, type } }) => {
		if (type === "otp") {
			return await getInjection(
				TWOFACTOR_SYMBOLS.TwoFactorService,
			).verifyOTPTwoFactor(code);
		}
		if (type === "totp") {
			return await getInjection(
				TWOFACTOR_SYMBOLS.TwoFactorService,
			).verifyTOTPTwoFactor(code);
		}
	});
