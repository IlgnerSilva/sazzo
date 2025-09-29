import { injectable } from "inversify";
import { headers } from "next/headers";
import type { ITwoFactorRepository } from "@/core/domain/repositories";
import { auth } from "@/lib/better-auth/auth";

@injectable()
export class TwoFactorRepository implements ITwoFactorRepository {
	async sendOTP() {
		return await auth.api.sendTwoFactorOTP({
			headers: await headers(),
		});
	}

	async verifyOTP(code: string) {
		return await auth.api.verifyTwoFactorOTP({
			headers: await headers(),
			body: {
				code,
			},
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
		return await auth.api.verifyTOTP({
			body: {
				code,
			},
			headers: await headers(),
		});
	}
}
