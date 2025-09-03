import { ContainerModule, type interfaces } from "inversify";
import { SignInEmailUseCase } from "@/core/application/use-cases/SignInEmail.use-case";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";
import { AuthRepository } from "@/core/infrastructure/repositories/better-auth/auth.better-auth.repository";
import { AUTH_SYMBOLS } from "../symbols/auth.symbols";

const initializateModule = (bind: interfaces.Bind) => {
	bind<IAuthRepository>(AUTH_SYMBOLS.IAuthRepository).to(AuthRepository);
	bind<SignInEmailUseCase>(AUTH_SYMBOLS.SignInEmailUseCase).to(
		SignInEmailUseCase,
	);
};

export const authModule = new ContainerModule(initializateModule);
