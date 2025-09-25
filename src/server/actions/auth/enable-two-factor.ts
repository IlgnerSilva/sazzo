"use server";

import { z } from "zod/v4";
import { getInjection } from "@/core/di/container";
import { AUTH_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";

export const enableTwoFactor = actionClient
	.inputSchema(
		z.object({
			password: z.string(),
		}),
	)
	.action(async ({ parsedInput: { password } }) => {
		return await getInjection(AUTH_SYMBOLS.EnableTwoFactorUseCase).execute(
			password,
		);
	});
