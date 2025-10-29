import {
	anonymousClient,
	apiKeyClient,
	emailOTPClient,
	inferAdditionalFields,
	magicLinkClient,
	multiSessionClient,
	phoneNumberClient,
	twoFactorClient,
	usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env";
import type { auth } from "./auth.ts";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_HOST_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		twoFactorClient({}),
		usernameClient(),
		anonymousClient(),
		phoneNumberClient(),
		magicLinkClient(),
		emailOTPClient(),
		apiKeyClient(),
		multiSessionClient(),
	],
});

export const getClientSession = () => {
	return authClient.useSession();
};
