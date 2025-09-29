import { injectable, inject } from "inversify";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import type { ITwoFactorRepository } from "@/core/domain/repositories";

@injectable()
export class TwoFactorService {
	constructor(
		@inject(TWOFACTOR_SYMBOLS.ITwoFactorRepository)
		private readonly twoFactorRepository: ITwoFactorRepository,
	) {}

	async enableTwoFactor(password: string) {
		return await this.twoFactorRepository.enableTwoFactor(password);
	}

	async disableTwoFactor(password: string) {
		return await this.twoFactorRepository.disableTwoFactor(password);
	}

	async sendOTPTwoFactor() {
		return await this.twoFactorRepository.sendOTP();
	}

	async verifyOTPTwoFactor(code: string) {
		return await this.twoFactorRepository.verifyOTP(code);
	}

	async verifyTOTPTwoFactor(code: string) {
		return await this.twoFactorRepository.verifyTwoFactorTOTP(code);
	}
}
