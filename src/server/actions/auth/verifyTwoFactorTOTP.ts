"use server"

import { z } from "zod/v4";
import { getInjection } from "@/core/di/container";
import { AUTH_SYMBOLS } from "@/core/di/symbols/auth.symbols";
import { actionClient } from "@/lib/safe-action";

export const verifyTwoFactorTOTP = actionClient
    .inputSchema(
        z.object({
            code: z.string().min(6).max(6),
        }),
    )
    .action(async ({ parsedInput: { code } }) => {
        return await getInjection(AUTH_SYMBOLS.VerifyTwoFactorTOTPUseCase).execute(code);
    });
