import { env } from "@/env";
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
import type { auth } from "./auth.ts";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_HOST_URL,
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => localStorage.getItem("authToken") || "",
    },
  },
  plugins: [
    inferAdditionalFields<typeof auth>(),
    twoFactorClient(),
    usernameClient(),
    anonymousClient(),
    phoneNumberClient(),
    magicLinkClient(),
    emailOTPClient(),
    apiKeyClient(),
    multiSessionClient(),
  ],
});
