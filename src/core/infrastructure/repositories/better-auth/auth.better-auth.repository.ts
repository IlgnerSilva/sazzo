import { injectable } from "inversify";
import { headers } from "next/headers";
import type { IAuthRepository } from "@/core/domain/repositories/auth.repository.interface";
import { auth } from "@/lib/better-auth/auth";

@injectable()
export class AuthRepository implements IAuthRepository {
	async signInEmail(email: string, password: string) {
		return await auth.api.signInEmail({
			body: {
				email,
				password,
			},
		});
	}

	async authSession() {
		return await auth.api.getSession({
			headers: await headers(),
		});
	}

	async twoFactor(password: string){
		return await auth.api.enableTwoFactor({
			body: {
				password,
			},
			headers: await headers(),
		});
	}
}
