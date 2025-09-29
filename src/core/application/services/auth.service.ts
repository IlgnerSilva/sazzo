import { injectable, inject } from "inversify";
import { AUTH_SYMBOLS } from "@/core/di/symbols";
import type { IAuthRepository } from "@/core/domain/repositories";

@injectable()
export class AuthService {
	constructor(
		@inject(AUTH_SYMBOLS.IAuthRepository)
		private readonly authRepository: IAuthRepository,
	) {}

	async signInWithEmail(email: string, password: string) {
		return await this.authRepository.signInEmail(email, password);
	}

	async getCurrentSession() {
		return await this.authRepository.authSession();
	}
}
