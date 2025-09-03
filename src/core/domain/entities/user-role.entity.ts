import { z } from "zod/v4";

export const UserRoleSchema = z.enum([
	"community",
	"professional",
	"member",
	"collaborator",
	"manager",
	"admin",
	"owner",
	"superadmin",
]);

export type UserRole = z.infer<typeof UserRoleSchema>;
