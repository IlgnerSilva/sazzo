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
import {
	ac,
	community,
	professional,
	member,
	collaborator,
	manager,
	owner,
	admin,
	support,
} from "./permissions";

export const authClient = createAuthClient({
	baseURL: env.NEXT_PUBLIC_HOST_URL,
	plugins: [
		inferAdditionalFields<typeof auth>(),
		twoFactorClient(),
		usernameClient(),
		anonymousClient(),
		phoneNumberClient(),
		magicLinkClient(),
		emailOTPClient(),
		apiKeyClient(),
		adminClient({
			...ac,
			roles: {
				admin,
				support,
			},
		}),
		organizationClient({
			ac,
			roles: {
				community,
				professional,
				member,
				collaborator,
				manager,
				owner,
			},
		}),
		multiSessionClient(),
	],
});
