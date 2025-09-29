import type { User } from "../entities/user.entity";

export interface ITwoFactorRepository {
	sendOTP: () => Promise<{ status: boolean }>;
	verifyOTP: (code: string) => Promise<{ token: string; user: User }>;
	enableTwoFactor: (
		password: string,
	) => Promise<{ totpURI: string; backupCodes: string[] }>;
	disableTwoFactor: (password: string) => Promise<{ status: boolean }>;
	verifyTwoFactorTOTP: (code: string) => Promise<{
		user: User;
		token: string;
	}>;
}
