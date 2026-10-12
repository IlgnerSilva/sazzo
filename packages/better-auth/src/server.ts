import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { db } from "@sazzo/drizzle";
import * as schema from "@sazzo/drizzle/schema";
import { compare, hash } from "bcrypt";
import { betterAuth } from "better-auth";
import { admin, openAPI, organization, twoFactor } from "better-auth/plugins";
import { v7 } from "uuid";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema,
	}),
	advanced: {
		database: {
			generateId: () => v7(),
		},
		useSecureCookies: process.env.NODE_ENV === "production",
	},
	secret: process.env.SECRET,
	baseURL: process.env.BASE_URL,
	basePath: "/api/v1/auth",
	emailAndPassword: {
		enabled: true,
		password: {
			hash: async (password: string) => await hash(password, 10),
			verify: async (data) => await compare(data.password, data.hash),
		},
		requireEmailVerification: true,
	},
	emailVerification: {},
	plugins: [
		admin(),
		organization(),
		twoFactor(),
		openAPI({
			disableDefaultReference: true,
		}),
	],
});
