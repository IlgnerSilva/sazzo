import { ContainerModule, type interfaces } from "inversify";
import { GetSessionUseCase } from "@/core/application/use-cases/GetSession.use-case";
import { SignInEmailUseCase } from "@/core/application/use-cases/SignInEmail.use-case";
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
};

export const authModule = new ContainerModule(initializateModule);
