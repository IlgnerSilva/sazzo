"use server";

import { getInjection } from "@/core/di/container";
import { TWOFACTOR_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";

export const sendOTPTwoFactor = actionClient.action(async () => {
	return await getInjection(
		TWOFACTOR_SYMBOLS.SendOTPTwoFactorUseCase,
	).execute();
});
