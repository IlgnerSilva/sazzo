import { APIError } from "better-auth/api";
import { createSafeActionClient } from "next-safe-action";
import { HTTP_STATUS } from "@/lib/constants";
import { logger } from "@/lib/logger";
import { getCachedSession } from "../better-auth/session-cached";

export const actionClient = createSafeActionClient({
	handleServerError(err, utils) {
		// ✅ Log estruturado de erros
		logger.error("Server action error", err as Error, {
			action: utils.metadata,
			clientInput: utils.clientInput,
		});

		// ✅ Better-auth errors
		if (err instanceof APIError) {
			return {
				code: err.body?.code || "UNKNOWN_ERROR",
				message: err.body?.message || "An error occurred",
				status: err.status,
			};
		}

		// ✅ Zod validation errors
		if (err.name === "ZodError") {
			return {
				code: "VALIDATION_ERROR",
				message: "Invalid input data",
				status: HTTP_STATUS.BAD_REQUEST,
			};
		}

		// ✅ Generic error handling
		if (err instanceof Error) {
			// ✅ Não expor detalhes internos em produção
			const message =
				process.env.NODE_ENV === "production"
					? "An unexpected error occurred"
					: err.message;

			return {
				code: "INTERNAL_ERROR",
				message,
				status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
			};
		}

		// ✅ Fallback
		return {
			code: "UNKNOWN_ERROR",
			message: "An unknown error occurred",
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		};
	},
});

// ✅ Helper para actions autenticadas
export const authenticatedAction = actionClient.use(async ({ next, ctx }) => {
	const session = await getCachedSession();
	if (!session) {
		throw new Error("UNAUTHORIZED");
	}
	return next({ ctx });
});
