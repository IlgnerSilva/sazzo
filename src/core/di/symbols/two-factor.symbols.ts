import type { ITwoFactorRepository } from "@/core/domain/repositories";
import { createSymbol } from "../utils/createSymbol.util";
import type { TwoFactorService } from "@/core/application/services";

export const TWOFACTOR_SYMBOLS = {
	ITwoFactorRepository: createSymbol<ITwoFactorRepository>(
		"ITwoFactorRepository",
	),
	TwoFactorService: createSymbol<TwoFactorService>("TwoFactorService"),
} as const;
