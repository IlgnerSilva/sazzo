import { injectable } from "inversify";
import { headers } from "next/headers";
import type { IAuthRepository } from "@/core/domain/repositories";
import { auth } from "@/lib/better-auth/auth";

@injectable()
export class AuthRepository implements IAuthRepository {
	async signInEmail(email: string, password: string) {
		return await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
	}

	async authSession() {
		return await auth.api.getSession({
			headers: await headers(),
		});
	}

	async enableTwoFactor(password: string) {
		return await auth.api.enableTwoFactor({
			body: {
				password,
			},
			headers: await headers(),
		});
	}

	async disableTwoFactor(password: string) {
		return await auth.api.disableTwoFactor({
			body: {
				password,
			},
			headers: await headers(),
		});
	}

	async verifyTwoFactorTOTP(code: string) {
		return auth.api.verifyTOTP({
			body: {
				code,
			},
			headers: await headers(),
		});
	}
}
