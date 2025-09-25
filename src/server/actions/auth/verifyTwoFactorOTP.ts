"use server";

import { z } from "zod/v4";
import { getInjection } from "@/core/di/container";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";

export const verifyTwoFactorOTP = actionClient
	.inputSchema(
		z.object({
			code: z.string().min(6).max(6),
		}),
	)
	.action(async ({ parsedInput: { code } }) => {
		return await getInjection(
			TWOFACTOR_SYMBOLS.VerifyTwoFactorOTPUseCase,
		).execute(code);
	});
