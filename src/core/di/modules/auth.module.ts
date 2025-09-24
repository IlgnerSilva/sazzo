import { ContainerModule, type interfaces } from "inversify";
import { SignInEmailUseCase } from "@/core/application/use-cases/SignInEmail.use-case";
import { EnableTwoFactor } from "@/core/application/use-cases/EnableTwoFactor.use-case";
import { GetSessionUseCase } from "@/core/application/use-cases/GetSession.use-case";
import { VerifyTwoFactorTOTPUseCase } from "@/core/application/use-cases/VerifyTwoFactorTOTP.use-case";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";
import { AuthRepository } from "@/core/infrastructure/repositories/better-auth/auth.better-auth.repository";
import { AUTH_SYMBOLS } from "../symbols/auth.symbols";

const initializateModule = (bind: interfaces.Bind) => {
	//Repositories
	bind<IAuthRepository>(AUTH_SYMBOLS.IAuthRepository).to(AuthRepository);

	//Use Cases
	bind<SignInEmailUseCase>(AUTH_SYMBOLS.SignInEmailUseCase).to(
		SignInEmailUseCase,
	);
	bind<GetSessionUseCase>(AUTH_SYMBOLS.GetSessionUseCase).to(GetSessionUseCase);
	bind<EnableTwoFactor>(AUTH_SYMBOLS.EnableTwoFactor).to(EnableTwoFactor);
	bind<VerifyTwoFactorTOTPUseCase>(
		AUTH_SYMBOLS.VerifyTwoFactorTOTPUseCase,
	).to(VerifyTwoFactorTOTPUseCase);
};

export const authModule = new ContainerModule(initializateModule);
