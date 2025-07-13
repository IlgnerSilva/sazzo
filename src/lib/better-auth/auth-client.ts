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

export const authClient = createAuthClient({
	baseURL: "http://localhost:3000",
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
