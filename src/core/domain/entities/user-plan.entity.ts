import { z } from "zod/v4";

export const UserPlanSchema = z.enum([
	"community",
	"professional",
	"enterprise",
]);

export type UserPlan = z.infer<typeof UserPlanSchema>;
