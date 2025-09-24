import type { SignInEmailUseCase } from "@/core/application/use-cases/SignInEmail.use-case";
import type { VerifyTwoFactorTOTPUseCase } from "@/core/application/use-cases/VerifyTwoFactorTOTP.use-case";
import type { DisabledTwoFactorUseCase } from "@/core/application/use-cases/DisabledTwoFactor.use-case";
import type { EnableTwoFactorUseCase } from "@/core/application/use-cases/EnableTwoFactor.use-case";
import type { GetSessionUseCase } from "@/core/application/use-cases/GetSession.use-case";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";
import { createSymbol } from "../utils/createSymbol.util";

export const AUTH_SYMBOLS = {
	IAuthRepository: createSymbol<IAuthRepository>("IAuthRepository"),
	SignInEmailUseCase: createSymbol<SignInEmailUseCase>("SignInEmailUseCase"),
	GetSessionUseCase: createSymbol<GetSessionUseCase>("GetSessionUseCase"),
	EnableTwoFactorUseCase: createSymbol<EnableTwoFactorUseCase>("EnableTwoFactorUseCase"),
	DisabledTwoFactorUseCase: createSymbol<DisabledTwoFactorUseCase>("DisabledTwoFactorUseCase"),
	VerifyTwoFactorTOTPUseCase: createSymbol<VerifyTwoFactorTOTPUseCase>(
		"VerifyTwoFactorTOTPUseCase",
	),

} as const;
