import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "@/env";
import * as schemas from "./schema";

export const db = drizzle(env.DATABASE_URL);
export const schema = schemas;
