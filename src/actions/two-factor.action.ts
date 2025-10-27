"use server";

import { sign } from "jsonwebtoken";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "@/lib/better-auth/auth";
import { actionClient } from "@/lib/next-safe-action";

export const sendTwoFactorOtp = actionClient
	.inputSchema(
		z.object({
			typeTwoFactor: z.enum(["otp", "totp"]),
		}),
	)
	.action(async ({ parsedInput: { typeTwoFactor } }) => {
		if (typeTwoFactor === "otp") {
			const res = await auth.api.sendTwoFactorOTP({
				body: { trustDevice: true },
				headers: await headers(),
			});
			if (res.status) {
				const token = sign({ typeTwoFactor }, "sdoifhidoshdsfdshlkfn", {
					expiresIn: "1h",
				});

				return { status: res.status, token };
			}
		}
		if (typeTwoFactor === "totp") {
			const token = sign({ typeTwoFactor }, "sdoifhidoshdsfdshlkfn", {
				expiresIn: "1h",
			});
			return { status: true, token };
		}
	});

export const verifyTwoFactor = actionClient
	.inputSchema(
		z.object({
			typeTwoFactor: z.enum(["otp", "totp"]),
			code: z.string(),
		}),
	)
	.action(async ({ parsedInput: { code, typeTwoFactor } }) => {
		if (typeTwoFactor === "otp")
			return await auth.api.verifyTwoFactorOTP({ body: { code } });

		if (typeTwoFactor === "totp")
			return await auth.api.verifyTOTP({ body: { code } });
	});
