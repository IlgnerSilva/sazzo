import { compare, hash } from "bcrypt";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
	admin,
	bearer,
	emailOTP,
	jwt,
	magicLink,
	multiSession,
	openAPI,
	twoFactor,
	username,
} from "better-auth/plugins";
import { db, schema } from "@/db/drizzle";
import { env } from "@/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: { ...schema },
	}),
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
	rateLimit: {
		enabled: true,
		window: 60,
		max: 100,
		storage: "memory",
		customRules: {
			"/api/auth/sign-in": {
				window: 60,
				max: 5,
			},
			"/api/auth/sign-up": {
				window: 60,
				max: 3,
			},
		},
	},
	logger: {
		level: "debug",
		disabled: false,
		log(level, message, ...args) {
			console.log(level, message, ...args);
		},
	},
	onAPIError: {
		onError: (error, request) => {
			console.log(error, request);
		},
	},
	secret: env.BETTER_AUTH_SECRET,
	session: {
		storeSessionInDatabase: false,
		preserveSessionInDatabase: false,
		disableSessionRefresh: false,
		expiresIn: 60 * 5,
		updateAge: 60 * 1,
		cookieCache: {
			enabled: true,
			maxAge: 60 * 5,
		},
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
		admin({
			impersonationSessionDuration: 60 * 30,
			adminRoles: "admin",
		}),
		emailOTP({
			otpLength: 6,
			expiresIn: 60 * 5,
			allowedAttempts: 5,
			async sendVerificationOTP({ email, otp, type }, request) {
				// Send email with OTP
				console.log(email, otp, type, request);
			},
		}),
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
				sendOTP(data, request) {
					console.log(data, request);
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
