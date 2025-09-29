import { ContainerModule, type interfaces } from "inversify";
import { AuthService } from "@/core/application/services";
import type { IAuthRepository } from "@/core/domain/repositories";
import { AuthRepository } from "@/core/infrastructure/repositories/better-auth";
import { AUTH_SYMBOLS } from "../symbols";

const initializateModule = (bind: interfaces.Bind) => {
	//Repositories
	bind<IAuthRepository>(AUTH_SYMBOLS.IAuthRepository).to(AuthRepository);

	//Services
	bind<AuthService>(AUTH_SYMBOLS.AuthService).to(AuthService);
};

export const authModule = new ContainerModule(initializateModule);
