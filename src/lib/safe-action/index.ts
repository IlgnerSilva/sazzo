import { APIError } from "better-auth/api";
import { createSafeActionClient } from "next-safe-action";

export const actionClient = createSafeActionClient({
	handleServerError(err) {
		if (err instanceof APIError) {
			return new APIError(err.status, {
				code: err.body?.code,
				message: err.body?.message,
			}).body;
		}
	},
});
