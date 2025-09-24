import { inject, injectable } from "inversify";
import { AUTH_SYMBOLS } from "@/core/di/symbols/auth.symbols";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";

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
