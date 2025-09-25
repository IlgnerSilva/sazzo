import type { Auth } from "../entities/auth.entity";
import type { User } from "../entities/user.entity";

export interface ITwoFactorRepository {
	sendOTP: () => Promise<{ status: boolean }>;
	verifyOTP: (code: string) => Promise<{ token: string; user: User }>;
}
