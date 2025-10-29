/**
 * ✅ Constantes centralizadas para evitar magic numbers/strings
 */

// Timeouts e Durations (em segundos)
export const DURATIONS = {
	SESSION_EXPIRY: 60 * 30, // 30 minutos
	SESSION_UPDATE_AGE: 60 * 5, // 5 minutos
	TWO_FACTOR_EXPIRY: 60 * 5, // 5 minutos
	PASSWORD_RESET_EXPIRY: 60 * 5, // 5 minutos
	EMAIL_VERIFICATION_EXPIRY: 60 * 5, // 5 minutos
	MAGIC_LINK_EXPIRY: 60 * 5, // 5 minutos
	JWT_TOKEN_EXPIRY: 60 * 60, // 1 hora
	REFRESH_TOKEN_EXPIRY: 60 * 60 * 24 * 30, // 30 dias
} as const;

// Rate Limiting
export const RATE_LIMITS = {
	LOGIN_ATTEMPTS: {
		MAX: 5,
		WINDOW: 60 * 15, // 15 minutos
	},
	SIGNUP_ATTEMPTS: {
		MAX: 3,
		WINDOW: 60 * 60, // 1 hora
	},
	TWO_FACTOR_OTP: {
		MAX: 3,
		WINDOW: 60 * 60 * 24, // 24 horas
	},
	PASSWORD_RESET: {
		MAX: 3,
		WINDOW: 60 * 60, // 1 hora
	},
	EMAIL_VERIFICATION: {
		MAX: 5,
		WINDOW: 60 * 60, // 1 hora
	},
} as const;

// Validation Rules
export const VALIDATION = {
	PASSWORD: {
		MIN_LENGTH: 8,
		MAX_LENGTH: 128,
		BCRYPT_ROUNDS: 10,
	},
	USERNAME: {
		MIN_LENGTH: 3,
		MAX_LENGTH: 20,
	},
	EMAIL: {
		MAX_LENGTH: 255,
	},
	NAME: {
		MIN_LENGTH: 2,
		MAX_LENGTH: 100,
	},
	OTP: {
		LENGTH: 6,
		DIGITS: 6,
		PERIOD: 30,
	},
	TOTP: {
		LENGTH: 6,
		DIGITS: 6,
		PERIOD: 30,
		BACKUP_CODES_COUNT: 10,
	},
} as const;

// Cookie Names
export const COOKIE_NAMES = {
	TWO_FACTOR_TEMP: "2fa_temp",
	SESSION: (appName: string) => `${appName}_session`,
} as const;

// Database Connection Pool
export const DB_POOL = {
	MAX_CONNECTIONS: 20,
	IDLE_TIMEOUT_MS: 30000,
	CONNECTION_TIMEOUT_MS: 5000,
} as const;

// Multi-Session
export const MULTI_SESSION = {
	MAX_SESSIONS: 5,
} as const;

// Organization
export const ORGANIZATION = {
	SLUG_MAX_LENGTH: 50,
	NAME_MAX_LENGTH: 100,
} as const;

// File Upload (para futuro)
export const FILE_UPLOAD = {
	MAX_SIZE_MB: 5,
	ALLOWED_TYPES: ["image/jpeg", "image/png", "image/webp"],
} as const;

// Pagination
export const PAGINATION = {
	DEFAULT_PAGE_SIZE: 20,
	MAX_PAGE_SIZE: 100,
} as const;

// Error Codes (para tradução)
export const ERROR_CODES = {
	// Authentication
	INVALID_CREDENTIALS: "INVALID_EMAIL_OR_PASSWORD",
	USER_NOT_FOUND: "USER_NOT_FOUND",
	USER_EXISTS: "USER_ALREADY_EXISTS",
	EMAIL_NOT_VERIFIED: "EMAIL_NOT_VERIFIED",
	SESSION_EXPIRED: "SESSION_EXPIRED",

	// Two-Factor
	TWO_FACTOR_REQUIRED: "TWO_FACTOR_NOT_ENABLED",
	INVALID_TWO_FACTOR_CODE: "INVALID_TWO_FACTOR_COOKIE",
	TWO_FACTOR_EXPIRED: "OTP_HAS_EXPIRED",

	// Rate Limiting
	RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",

	// Generic
	SERVER_ERROR: "INTERNAL_SERVER_ERROR",
	VALIDATION_ERROR: "VALIDATION_ERROR",
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
} as const;
