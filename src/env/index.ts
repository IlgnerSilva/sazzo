import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod/v4";
import "dotenv/config";

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    HOST_URL: z.url(),
    APP_NAME: z.string(),
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string(),
  },
  client: {
    NEXT_PUBLIC_HOST_URL: z.url().default("http://localhost:3000"),
    NEXT_PUBLIC_APP_NAME: z.string().default("sazzo"),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    HOST_URL: process.env.HOST_URL,
    APP_NAME: process.env.APP_NAME,
    NODE_ENV: process.env.NODE_ENV,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    BETTER_AUTH_URL: process.env.BETTER_AUTH_URL,
    NEXT_PUBLIC_HOST_URL: process.env.NEXT_PUBLIC_HOST_URL,
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
  },
});
