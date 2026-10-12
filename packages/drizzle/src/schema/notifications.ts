import { sql } from "drizzle-orm";
import {
	index,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const notificationStatus = pgEnum("notification_status", [
	"unread",
	"read",
	"archived",
]);

export const notifications = pgTable(
	"notifications",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		type: text().notNull(),
		title: text().notNull(),
		body: text(),
		status: notificationStatus().default("unread").notNull(),
		actionUrl: text("action_url"),
		data: jsonb(),
		readAt: timestamp("read_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("notifications_user_status_idx").using(
			"btree",
			table.userId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
