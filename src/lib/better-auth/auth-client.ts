import { createAuthClient } from "better-auth/react";
import type { auth } from "./auth.ts";
import {
	inferAdditionalFields,
	twoFactorClient,
	usernameClient,
	anonymousClient,
	phoneNumberClient,
	magicLinkClient,
	emailOTPClient,
	apiKeyClient,
	adminClient,
	organizationClient,
	multiSessionClient,
} from "better-auth/client/plugins";
import { env } from "@/env";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		twoFactorClient(),
		usernameClient(),
		anonymousClient(),
		phoneNumberClient(),
		magicLinkClient(),
		emailOTPClient(),
		apiKeyClient(),
		adminClient(),
		organizationClient(),
		multiSessionClient(),
	],
});
