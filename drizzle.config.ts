import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "@/env";

export default defineConfig({
	out: "./src/db/drizzle/migration",
	schema: "./src/db/drizzle/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
