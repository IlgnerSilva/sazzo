"use server";

import { z } from "zod/v4";
import { getInjection } from "@/core/di/container";
import { AUTH_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";

export const signinWithCredentials = actionClient
	.inputSchema(
		z.object({
			email: z.email(),
			password: z.string().min(8),
			rememberMe: z.boolean().optional(),
		}),
	)
	.action(async ({ parsedInput: { email, password, rememberMe } }) => {
		return await getInjection(AUTH_SYMBOLS.SignInEmailUseCase).execute(
			email,
			password,
		);
	});
