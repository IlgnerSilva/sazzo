import type { ITwoFactorRepository } from "@/core/domain/repositories";
import { createSymbol } from "../utils/createSymbol.util";
import type {
	VerifyTwoFactorOTPUseCase,
	SendOTPTwoFactorUseCase,
} from "@/core/application/use-cases";

export const TWOFACTOR_SYMBOLS = {
	ITwoFactorRepository: createSymbol<ITwoFactorRepository>(
		"ITwoFactorRepository",
	),
	SendOTPTwoFactorUseCase: createSymbol<SendOTPTwoFactorUseCase>(
		"SendOTPTwoFactorUseCase",
	),
	VerifyTwoFactorOTPUseCase: createSymbol<VerifyTwoFactorOTPUseCase>(
		"VerifyTwoFactorOTPUseCase",
	),
} as const;
