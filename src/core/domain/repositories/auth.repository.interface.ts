import type { Auth } from "../entities/auth.entity";
import type { User } from "../entities/user.entity";

export interface IAuthRepository {
	signInEmail: (
		email: string,
		password: string,
	) => Promise<{
		user: User;
		token: string;
		url: string | undefined;
		redirect: boolean;
		twoFactorRedirect?: boolean
	}>;

	authSession: () => Promise<Auth | null>;
	enableTwoFactor: (
		password: string,
	) => Promise<{ totpURI: string; backupCodes: string[] }>;
	disableTwoFactor: (
		password: string,
	) => Promise<{ status: boolean; }>;
	verifyTwoFactorTOTP: (
		code: string,
	) => Promise<{
		user: User;
		token: string;
	}>;
}
