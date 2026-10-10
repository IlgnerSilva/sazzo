import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./relations";
import { relations } from "./relations";

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
const db = drizzle({
	client: pool,
	relations: relations,
});

export { db, schema };
