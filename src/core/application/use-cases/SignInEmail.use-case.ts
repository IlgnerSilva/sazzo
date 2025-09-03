import { inject, injectable } from "inversify";
import { AUTH_SYMBOLS } from "@/core/di/symbols/auth.symbols";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";

@injectable()
export class SignInEmailUseCase {
	constructor(
		@inject(AUTH_SYMBOLS.IAuthRepository)
		private readonly authRepository: IAuthRepository,
	) {}

	async execute(email: string, password: string) {
		return await this.authRepository.signInEmail(email, password);
	}
}
