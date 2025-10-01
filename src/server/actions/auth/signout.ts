"use server";

import { getInjection } from "@/core/di/container";
import { AUTH_SYMBOLS } from "@/core/di/symbols";
import { actionClient } from "@/lib/safe-action";
import { redirect } from "next/navigation";

export const signOut = actionClient.action(async (_) => {
	const { success } = await getInjection(AUTH_SYMBOLS.AuthService).signOut();

	if (success) {
		return redirect("/auth/signin");
	}
	return { success };
});
