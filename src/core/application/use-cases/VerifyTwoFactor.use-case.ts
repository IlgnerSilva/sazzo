import { inject, injectable } from "inversify";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import type { ITwoFactorRepository } from "@/core/domain/repositories";

@injectable()
export class VerifyTwoFactorUseCase {
	constructor(
		@inject(TWOFACTOR_SYMBOLS.ITwoFactorRepository)
		private readonly twoFactorRepository: ITwoFactorRepository,
	) {}

	async execute(code: string, type_verify: "totp" | "otp") {
		if (type_verify === "totp") {
			console.log("AQUI type_verify");
			const teste = await this.twoFactorRepository.verifyTwoFactorTOTP(code);
			return teste;
		}
		if (type_verify === "otp") {
			console.log("AQUI2");
			return await this.twoFactorRepository.verifyOTP(code);
		}
	}
}
