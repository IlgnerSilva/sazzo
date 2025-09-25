import { inject, injectable } from "inversify";
import { AUTH_SYMBOLS } from "@/core/di/symbols";
import type { IAuthRepository } from "@/core/domain/repositories";

@injectable()
export class VerifyTwoFactorTOTPUseCase {
	constructor(
		@inject(AUTH_SYMBOLS.IAuthRepository)
		private readonly authRepository: IAuthRepository,
	) {}

	async execute(code: string) {
		return await this.authRepository.verifyTwoFactorTOTP(code);
	}
}
