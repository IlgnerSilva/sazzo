import { compare, hash } from "bcrypt";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
	bearer,
	jwt,
	magicLink,
	multiSession,
	openAPI,
	organization,
	admin as pluginAdmin,
	twoFactor,
	username,
} from "better-auth/plugins";
import { env } from "@/env";
import { db, schema } from "@/lib/drizzle";
import { resend } from "../resend";
import { PlaidVerifyIdentityEmail } from "../resend/templates/send-code-OTP";
import {
	ac,
	admin,
	collaborator,
	community,
	manager,
	member,
	owner,
	professional,
	support,
} from "./permissions";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { ...schema },
	}),
	rateLimit: {
		enabled: true,
		max: 2,
		window: 60 * 5,
		storage: "memory",
	},
	appName: env.NEXT_PUBLIC_APP_NAME,
	baseURL: env.NEXT_PUBLIC_HOST_URL,
	trustedOrigins: [env.NEXT_PUBLIC_HOST_URL],
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: false,
		async sendResetPassword(data, request) {
			// Send email with reset password link
			console.log(data, request);
		},
		password: {
			hash: async (password) => {
				return await hash(password, 6);
			},
			verify: async (data) => {
				return await compare(data.password, data.hash);
			},
		},
		resetPasswordTokenExpiresIn: 60 * 5,
	},
	advanced: {
		database: {
			generateId: () => {
				return crypto.randomUUID();
			},
		},
		cookiePrefix: env.APP_NAME,
		useSecureCookies: env.NODE_ENV === "production",
		disableCSRFCheck: false,
		defaultCookieAttributes: {
			sameSite: "Lax",
			secure: env.NODE_ENV === "production",
			httpOnly: true,
		},
	},
	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		async sendVerificationEmail(data, request) {
			// Send email with verification link
			console.log(data, request);
		},
		async onEmailVerification(user, request) {
			console.log(user, request);
		},
		expiresIn: 60 * 5,
	},

	secret: env.BETTER_AUTH_SECRET,
	session: {
		storeSessionInDatabase: false,
		preserveSessionInDatabase: false,
		disableSessionRefresh: false,
		expiresIn: 60 * 30,
		updateAge: 60 * 5,
	},
	user: {
		changeEmail: {
			enabled: false,
		},
		deleteUser: {
			enabled: false,
		},
	},
	account: {
		accountLinking: {
			trustedProviders: ["google"],
			updateUserInfoOnLink: true,
			enabled: true,
		},
		updateAccountOnSignIn: true,
	},
	plugins: [
		openAPI({
			path: "/api/auth/reference",
		}),
		jwt({
			jwt: {
				issuer: env.HOST_URL,
				audience: env.APP_NAME,
				definePayload(session) {
					return session;
				},
			},
		}),
		multiSession({
			maximumSessions: 5,
		}),
		bearer({
			requireSignature: true,
		}),
		pluginAdmin({
			impersonationSessionDuration: 60 * 30,
			...ac,
			roles: {
				admin,
				support,
			},
		}),
		organization({
			ac,
			roles: {
				community,
				professional,
				member,
				collaborator,
				manager,
				owner,
			},
		}),

		// emailOTP({
		// 	otpLength: 6,
		// 	expiresIn: 60 * 5,
		// 	allowedAttempts: 5,
		// 	async sendVerificationOTP({ email, otp, type }, request) {
		// 		await resend.emails.send({
		// 			from: "Acme <onboarding@resend.dev>",
		// 			to: ["ilgnersilva@outlook.com"],
		// 			subject: "Código de verifiação OTP",
		// 			react: PlaidVerifyIdentityEmail({ validationCode: otp }),
		// 		});
		// 		console.log(email, otp, type, request);
		// 	},
		// }),
		magicLink({
			expiresIn: 60 * 5,
			sendMagicLink({ email, token, url }, request) {
				// Send email with magic link
				console.log(email, token, url, request);
			},
		}),
		username({
			maxUsernameLength: 20,
			minUsernameLength: 3,
		}),
		twoFactor({
			otpOptions: {
				digits: 6,
				period: 30,
				async sendOTP(data, request) {
					const teste = await resend.emails.send({
						from: "Acme <onboarding@resend.dev>",
						to: ["ilgnersilva@outlook.com"],
						subject: "Código de verifiação OTP",
						react: PlaidVerifyIdentityEmail({ validationCode: data.otp }),
					});
					console.log(data, request, teste);
				},
			},
			totpOptions: {
				digits: 6,
				period: 30,
				backupCodes: { length: 10 },
			},
		}),
		nextCookies(),
	],
});
