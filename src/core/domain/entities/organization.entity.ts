import { z } from "zod/v4";

export const OrganizationSchema = z.object({
	id: z.string(),
	name: z.string(),
	slug: z.string(),
	createdAt: z.date(),
	logo: z.string().nullable().optional(),
	metadata: z.any().optional(),
});

export type Organization = z.infer<typeof OrganizationSchema>;
