import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/lib/drizzle/migration",
	schema: "./src/lib/drizzle/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL || "",
	},
});
