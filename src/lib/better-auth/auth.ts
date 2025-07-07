import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema } from "@/db/drizzle";
import {
	twoFactor,
	username,
	anonymous,
	phoneNumber,
	magicLink,
	emailOTP,
	apiKey,
	admin,
	organization,
	bearer,
	multiSession,
	jwt,
	openAPI,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { ...schema },
	}),
	appName: "sazzo",
	emailAndPassword: {
		enabled: true,
	},
	plugins: [
		openAPI(),
		jwt(),
		multiSession(),
		bearer(),
		organization(),
		admin(),
		apiKey(),
		emailOTP({
			async sendVerificationOTP({ email, otp, type }, request) {
				// Send email with OTP
			},
		}),
		magicLink({
			sendMagicLink({ email, token, url }, request) {
				// Send email with magic link
			},
		}),
		phoneNumber(),
		anonymous(),
		username(),
		twoFactor(),
		nextCookies(),
	],
});
