import { sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";

export const user = pgTable(
	"user",
	{
		id: text().primaryKey(),
		name: text().notNull(),
		email: text().notNull(),
		emailVerified: boolean("email_verified").default(false).notNull(),
		image: text(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
		role: text(),
		banned: boolean().default(false),
		banReason: text("ban_reason"),
		banExpires: timestamp("ban_expires"),
		twoFactorEnabled: boolean("two_factor_enabled").default(false),
	},
	(table) => [unique("user_email_key").on(table.email)],
);
