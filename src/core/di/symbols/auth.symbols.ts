import type { SignInEmailUseCase } from "@/core/application/use-cases/SignInEmail.use-case";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";
import { createSymbol } from "../utils/createSymbol.util";

export const AUTH_SYMBOLS = {
	IAuthRepository: createSymbol<IAuthRepository>("IAuthRepository"),
	SignInEmailUseCase: createSymbol<SignInEmailUseCase>("SignInEmailUseCase"),
} as const;
