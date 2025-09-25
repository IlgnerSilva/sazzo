import { ContainerModule, type interfaces } from "inversify";
import {
	SignInEmailUseCase,
	EnableTwoFactorUseCase,
	GetSessionUseCase,
	VerifyTwoFactorTOTPUseCase,
	DisabledTwoFactorUseCase,
} from "@/core/application/use-cases";
import type { IAuthRepository } from "@/core/domain/repositories";
import { AuthRepository } from "@/core/infrastructure/repositories/better-auth";
import { AUTH_SYMBOLS } from "../symbols";

const initializateModule = (bind: interfaces.Bind) => {
	//Repositories
	bind<IAuthRepository>(AUTH_SYMBOLS.IAuthRepository).to(AuthRepository);

	//Use Cases
	bind<SignInEmailUseCase>(AUTH_SYMBOLS.SignInEmailUseCase).to(
		SignInEmailUseCase,
	);
	bind<GetSessionUseCase>(AUTH_SYMBOLS.GetSessionUseCase).to(GetSessionUseCase);
	bind<EnableTwoFactorUseCase>(AUTH_SYMBOLS.EnableTwoFactorUseCase).to(
		EnableTwoFactorUseCase,
	);
	bind<DisabledTwoFactorUseCase>(AUTH_SYMBOLS.DisabledTwoFactorUseCase).to(
		DisabledTwoFactorUseCase,
	);
	bind<VerifyTwoFactorTOTPUseCase>(AUTH_SYMBOLS.VerifyTwoFactorTOTPUseCase).to(
		VerifyTwoFactorTOTPUseCase,
	);
};

export const authModule = new ContainerModule(initializateModule);
