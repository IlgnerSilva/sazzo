import { ContainerModule, type interfaces } from "inversify";
import type { ITwoFactorRepository } from "@/core/domain/repositories";
import { TwoFactorRepository } from "@/core/infrastructure/repositories/better-auth";
import { TWOFACTOR_SYMBOLS } from "../symbols";
import {
	VerifyTwoFactorOTPUseCase,
	SendOTPTwoFactorUseCase,
} from "@/core/application/use-cases";

const initializateModule = (bind: interfaces.Bind) => {
	//Repositories
	bind<ITwoFactorRepository>(TWOFACTOR_SYMBOLS.ITwoFactorRepository).to(
		TwoFactorRepository,
	);

	//Use Cases
	bind<SendOTPTwoFactorUseCase>(TWOFACTOR_SYMBOLS.SendOTPTwoFactorUseCase).to(
		SendOTPTwoFactorUseCase,
	);
	bind<VerifyTwoFactorOTPUseCase>(
		TWOFACTOR_SYMBOLS.VerifyTwoFactorOTPUseCase,
	).to(VerifyTwoFactorOTPUseCase);
};

export const twoFactorModule = new ContainerModule(initializateModule);
