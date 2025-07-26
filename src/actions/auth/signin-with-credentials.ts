"use server";

import { z } from "zod/v4";
import { actionClient } from "@/lib/safe-action";
import { auth } from "@/lib/better-auth/auth";
import { APIError } from "better-auth/api";
import { loginCredentialSchema } from "@/schemas/auth";

export const signinWithCredentials = actionClient
	.inputSchema(loginCredentialSchema)
	.action(async ({ parsedInput: { email, password, rememberMe } }) => {
		return await auth.api.signInEmail({
			body: {
				email,
				password,
				rememberMe,
			},
		});
	});
