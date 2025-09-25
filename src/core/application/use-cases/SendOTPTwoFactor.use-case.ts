import { inject, injectable } from "inversify";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import type { ITwoFactorRepository } from "@/core/domain/repositories";

@injectable()
export class SendOTPTwoFactorUseCase {
	constructor(
		@inject(TWOFACTOR_SYMBOLS.ITwoFactorRepository)
		private readonly twoFactorRepository: ITwoFactorRepository,
	) {}

	async execute() {
		return await this.twoFactorRepository.sendOTP();
	}
}
