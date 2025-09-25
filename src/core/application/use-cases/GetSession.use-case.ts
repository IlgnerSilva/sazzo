import { inject, injectable } from "inversify";
import { AUTH_SYMBOLS } from "@/core/di/symbols";
import type { IAuthRepository } from "@/core/domain/repositories";

@injectable()
export class GetSessionUseCase {
	constructor(
		@inject(AUTH_SYMBOLS.IAuthRepository)
		private readonly authRepository: IAuthRepository,
	) {}

	async execute() {
		return await this.authRepository.authSession();
	}
}
