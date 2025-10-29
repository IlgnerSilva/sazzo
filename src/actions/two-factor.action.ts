"use server";

import { sign, verify } from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { env } from "@/env";
import { auth } from "@/lib/better-auth/auth";
import { actionClient } from "@/lib/next-safe-action";

const secret = env.TWO_FACTOR_SECRET;

const TWO_FACTOR_COOKIE_NAME = "2fa_temp";
const TWO_FACTOR_COOKIE_MAX_AGE = 60 * 5; // 5 minutos

export const sendTwoFactor = actionClient
	.inputSchema(
		z.object({
			typeTwoFactor: z.enum(["otp", "totp"]),
		}),
	)
	.action(async ({ parsedInput: { typeTwoFactor } }) => {
		const cookieStore = await cookies();

		if (typeTwoFactor === "otp") {
			const res = await auth.api.sendTwoFactorOTP({
				body: { trustDevice: true },
				headers: await headers(),
			});

			if (res.status) {
				const token = sign({ typeTwoFactor }, secret, {
					expiresIn: "5m",
				});

				cookieStore.set(TWO_FACTOR_COOKIE_NAME, token, {
					httpOnly: true,
					secure: env.NODE_ENV === "production",
					sameSite: "lax",
					maxAge: TWO_FACTOR_COOKIE_MAX_AGE,
					path: "/",
				});

				return { status: res.status, needsRedirect: true };
			}
		}

		if (typeTwoFactor === "totp") {
			const token = sign({ typeTwoFactor }, secret, {
				expiresIn: "5m",
			});

			cookieStore.set(TWO_FACTOR_COOKIE_NAME, token, {
				httpOnly: true,
				secure: env.NODE_ENV === "production",
				sameSite: "lax",
				maxAge: TWO_FACTOR_COOKIE_MAX_AGE,
				path: "/",
			});

			return { status: true, needsRedirect: true };
		}
	});

export async function validateTwoFactorToken() {
	const cookieStore = await cookies();
	const token = cookieStore.get(TWO_FACTOR_COOKIE_NAME)?.value;

	if (!token) {
		return { valid: false, data: null };
	}

	try {
		const decoded = verify(token, secret) as {
			typeTwoFactor: "otp" | "totp";
			iat?: number;
			exp?: number;
		};

		return { valid: true, data: decoded };
	} catch (error) {
		return { valid: false, data: null, error };
	}
}

export async function clearTwoFactorCookie() {
	const cookieStore = await cookies();
	cookieStore.delete(TWO_FACTOR_COOKIE_NAME);
}

export const verifyTwoFactor = actionClient
	.inputSchema(
		z.object({
			code: z.string().min(1),
			typeTwoFactor: z.enum(["otp", "totp"]),
		}),
	)
	.action(async ({ parsedInput: { code, typeTwoFactor } }) => {
		const { valid } = await validateTwoFactorToken();

		if (!valid) {
			throw new Error("INVALID_TWO_FACTOR_TOKEN");
		}

		if (typeTwoFactor === "otp") {
			const res = await auth.api.verifyTwoFactorOTP({
				body: { code },
				headers: await headers(),
			});
			if (res) {
				await clearTwoFactorCookie();
				return res;
			}
		} else {
			const res = await auth.api.verifyTOTP({
				body: { code },
				headers: await headers(),
			});
			if (res) {
				await clearTwoFactorCookie();
				return res;
			}
		}
	});
