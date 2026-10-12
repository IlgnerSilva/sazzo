import { index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const member = pgTable(
	"member",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		role: text().default("member").notNull(),
		createdAt: timestamp("created_at").notNull(),
	},
	(table) => [
		index("member_organizationId_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
		index("member_userId_idx").using("btree", table.userId.asc().nullsLast()),
	],
);
