import type {
	SignInEmailUseCase,
	VerifyTwoFactorTOTPUseCase,
	DisabledTwoFactorUseCase,
	EnableTwoFactorUseCase,
	GetSessionUseCase,
} from "@/core/application/use-cases";
import type { IAuthRepository } from "@/core/domain/repositories";

import { createSymbol } from "../utils/createSymbol.util";

export const AUTH_SYMBOLS = {
	IAuthRepository: createSymbol<IAuthRepository>("IAuthRepository"),
	SignInEmailUseCase: createSymbol<SignInEmailUseCase>("SignInEmailUseCase"),
	GetSessionUseCase: createSymbol<GetSessionUseCase>("GetSessionUseCase"),
	EnableTwoFactorUseCase: createSymbol<EnableTwoFactorUseCase>(
		"EnableTwoFactorUseCase",
	),
	DisabledTwoFactorUseCase: createSymbol<DisabledTwoFactorUseCase>(
		"DisabledTwoFactorUseCase",
	),
	VerifyTwoFactorTOTPUseCase: createSymbol<VerifyTwoFactorTOTPUseCase>(
		"VerifyTwoFactorTOTPUseCase",
	),
} as const;
