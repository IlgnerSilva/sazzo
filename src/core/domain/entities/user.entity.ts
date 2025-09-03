import { z } from "zod/v4";

export const UserSchema = z.object({
	name: z.string(),
	email: z.string(),
	emailVerified: z.boolean(),
	image: z.string().nullable().optional(),
	createdAt: z.date().nullable().optional(),
	updatedAt: z.date().nullable().optional(),
	role: z.string().nullable().optional(),
	banned: z.boolean().nullable().optional(),
	banReason: z.string().nullable().optional(),
	banExpires: z.date().nullable().optional(),
	username: z.string().nullable().optional(),
	displayUsername: z.string().nullable().optional(),
	twoFactorEnabled: z.boolean().nullable().optional(),
	id: z.string(),
});

export type User = z.infer<typeof UserSchema>;
