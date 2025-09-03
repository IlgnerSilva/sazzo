import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/better-auth/auth";

export async function getSession() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user) {
		redirect("/auth/signin");
	}

	return session;
}
