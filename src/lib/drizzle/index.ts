import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env";
import * as schemas from "./schema";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	max: 20,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 5000,
});

process.on("SIGTERM", async () => {
	await pool.end();
	process.exit(0);
});

process.on("SIGINT", async () => {
	await pool.end();
	process.exit(0);
});

pool.on("error", (err) => {
	console.error("Unexpected error on idle client", err);
});

export const db = drizzle(pool, {
	schema: schemas,
	logger: env.NODE_ENV === "development",
});

export const schema = schemas;

export async function checkDatabaseHealth(): Promise<boolean> {
	try {
		await pool.query("SELECT 1");
		return true;
	} catch (error) {
		console.error("Database health check failed:", error);
		return false;
	}
}
