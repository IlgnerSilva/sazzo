import {
  adminClient,
  anonymousClient,
  apiKeyClient,
  emailOTPClient,
  inferAdditionalFields,
  magicLinkClient,
  multiSessionClient,
  organizationClient,
  phoneNumberClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { env } from "@/env";
import type { auth } from "./auth.ts";
import {
  ac,
  admin,
  collaborator,
  community,
  manager,
  member,
  owner,
  professional,
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
