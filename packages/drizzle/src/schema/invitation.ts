import { sql } from "drizzle-orm";
import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const invitation = pgTable(
	"invitation",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		email: text().notNull(),
		role: text(),
		status: text().default("pending").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		inviterId: text("inviter_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("invitation_email_idx").using("btree", table.email.asc().nullsLast()),
		index("invitation_organizationId_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
	],
);
