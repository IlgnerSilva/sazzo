import { injectable } from "inversify";
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
}
