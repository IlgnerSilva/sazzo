import { env } from "@/env";

/**
 * ✅ Sistema de logging estruturado
 * Em produção, integrar com Sentry, Datadog, etc.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
	userId?: string;
	sessionId?: string;
	requestId?: string;
	[key: string]: any;
}

class Logger {
	private isDevelopment = env.NODE_ENV === "development";

	private formatMessage(
		level: LogLevel,
		message: string,
		context?: LogContext,
	): string {
		const timestamp = new Date().toISOString();
		const contextStr = context ? JSON.stringify(context, null, 2) : "";
		return `[${timestamp}] [${level.toUpperCase()}] ${message} ${contextStr}`;
	}

	debug(message: string, context?: LogContext): void {
		if (this.isDevelopment) {
			console.debug(this.formatMessage("debug", message, context));
		}
	}

	info(message: string, context?: LogContext): void {
		console.info(this.formatMessage("info", message, context));
		// ✅ TODO: Enviar para serviço de logging em produção
	}

	warn(message: string, context?: LogContext): void {
		console.warn(this.formatMessage("warn", message, context));
		// ✅ TODO: Enviar para serviço de logging em produção
	}

	error(message: string, error?: Error, context?: LogContext): void {
		const errorContext = {
			...context,
			error: error
				? {
						message: error.message,
						stack: error.stack,
						name: error.name,
					}
				: undefined,
		};

		console.error(this.formatMessage("error", message, errorContext));

		// ✅ TODO: Integrar com Sentry
		// if (env.NODE_ENV === 'production') {
		//   Sentry.captureException(error, { contexts: { custom: context } });
		// }
	}

	// ✅ Helpers específicos
	auth(message: string, context?: LogContext): void {
		this.info(`[AUTH] ${message}`, context);
	}

	database(message: string, context?: LogContext): void {
		this.info(`[DB] ${message}`, context);
	}

	api(message: string, context?: LogContext): void {
		this.info(`[API] ${message}`, context);
	}
}

export const logger = new Logger();

// ✅ Helper para capturar erros em async functions
export async function withErrorLogging<T>(
	fn: () => Promise<T>,
	errorMessage: string,
	context?: LogContext,
): Promise<T> {
	try {
		return await fn();
	} catch (error) {
		logger.error(errorMessage, error as Error, context);
		throw error;
	}
}
