import { getInjection } from "@/core/di/container";
import { AUTH_SYMBOLS } from "@/core/di/symbols/auth.symbols";

export async function getSessionWithAutenticaded() {
	return await getInjection(AUTH_SYMBOLS.AuthService).getCurrentSession();
}
