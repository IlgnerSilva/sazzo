import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const session = pgTable(
	"session",
	{
		id: text().primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text().notNull(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		updatedAt: timestamp("updated_at").notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		impersonatedBy: text("impersonated_by"),
		activeOrganizationId: text("active_organization_id"),
	},
	(table) => [
		index("session_userId_idx").using("btree", table.userId.asc().nullsLast()),
		unique("session_token_key").on(table.token),
	],
);
