"use server";

import { z } from "zod/v4";
import { getInjection } from "@/core/di/container";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";

export const disableTwoFactor = actionClient
	.inputSchema(
		z.object({
			password: z.string(),
		}),
	)
	.action(async ({ parsedInput: { password } }) => {
		return await getInjection(
			TWOFACTOR_SYMBOLS.ITwoFactorRepository,
		).disableTwoFactor(password);
	});
