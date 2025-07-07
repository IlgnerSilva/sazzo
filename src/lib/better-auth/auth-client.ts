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
	baseURL:
		"https://3000-firebase-sazzo-1750791282318.cluster-vpxjqdstfzgs6qeiaf7rdlsqrc.cloudworkstations.dev/",
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
