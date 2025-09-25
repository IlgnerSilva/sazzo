import { inject, injectable } from "inversify";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import type { ITwoFactorRepository } from "@/core/domain/repositories";

@injectable()
export class VerifyTwoFactorOTPUseCase {
	constructor(
		@inject(TWOFACTOR_SYMBOLS.VerifyTwoFactorOTPUseCase)
		private readonly twoFactorRepository: ITwoFactorRepository,
	) {}

	async execute(code: string) {
		return await this.twoFactorRepository.verifyOTP(code);
	}
}
