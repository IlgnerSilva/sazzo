import { z } from "zod/v4";

export const loginCredentialSchema = z.object({
	email: z.email(),
	password: z.string(),
	rememberMe: z.boolean().optional(),
});
