import type { User } from "../entities/user.entity";

export interface IAuthRepository {
	signInEmail: (
		email: string,
		password: string,
	) => Promise<{
		user: User;
		token: string;
		url: string | undefined;
		redirect: boolean;
	}>;
}
