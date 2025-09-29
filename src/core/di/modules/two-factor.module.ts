import { ContainerModule, type interfaces } from "inversify";
import type { ITwoFactorRepository } from "@/core/domain/repositories";
import { TwoFactorRepository } from "@/core/infrastructure/repositories/better-auth";
import { TWOFACTOR_SYMBOLS } from "../symbols";
import { TwoFactorService } from "@/core/application/services";

const initializateModule = (bind: interfaces.Bind) => {
	//Repositories
	bind<ITwoFactorRepository>(TWOFACTOR_SYMBOLS.ITwoFactorRepository).to(
		TwoFactorRepository,
	);

	//Services
	bind<TwoFactorService>(TWOFACTOR_SYMBOLS.TwoFactorService).to(
		TwoFactorService,
	);
};

export const twoFactorModule = new ContainerModule(initializateModule);
