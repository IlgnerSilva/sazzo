import { z } from "zod/v4";

// Schema para Session
export const SessionSchema = z.object({
	id: z.string(),
	userId: z.string(),
	expiresAt: z.date(),
	createdAt: z.date(),
	updatedAt: z.date(),
	token: z.string(),
	ipAddress: z.string().nullable().optional(),
	userAgent: z.string().nullable().optional(),
	impersonatedBy: z.string().nullable().optional(),
	activeOrganizationId: z.string().nullable().optional(),
});

export type Session = z.infer<typeof SessionSchema>;
