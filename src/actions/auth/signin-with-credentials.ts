"use server";

import { auth } from "@/lib/better-auth/auth";
import { APIError } from "better-auth/api";
import { toast } from "sonner";

interface Props {
	email: string;
	password: string;
	rememberMe?: boolean;
}

export async function signinWithCredentials({
	email,
	password,
	rememberMe,
}: Props) {
	try {
		return await auth.api.signInEmail({
			body: {
				email,
				password,
				rememberMe,
			},
		});
	} catch (error) {
		if (error instanceof APIError) {
			throw new APIError(error.status, {
				message: error.message,
				code: error.body?.code,
			});
		}
	}
}
