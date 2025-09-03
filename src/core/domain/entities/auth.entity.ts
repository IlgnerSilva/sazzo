import { z } from "zod/v4";
import { SessionSchema } from "./session.entity";
import { UserSchema } from "./user.entity";

export const AuthSchema = z.object({
	session: SessionSchema,
	user: UserSchema,
});

export type Auth = z.infer<typeof AuthSchema>;
