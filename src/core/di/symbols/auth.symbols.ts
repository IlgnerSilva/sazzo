import type { AuthService } from "@/core/application/services";
import type { IAuthRepository } from "@/core/domain/repositories";

import { createSymbol } from "../utils/createSymbol.util";

export const AUTH_SYMBOLS = {
	IAuthRepository: createSymbol<IAuthRepository>("IAuthRepository"),
	AuthService: createSymbol<AuthService>("AuthService"),
} as const;
