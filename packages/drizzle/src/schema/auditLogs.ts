import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const auditLogs = pgTable(
	"audit_logs",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		actorId: text("actor_id").references(() => user.id, {
			onDelete: "set null",
		}),
		action: text().notNull(),
		resourceType: text("resource_type").notNull(),
		resourceId: text("resource_id"),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		before: jsonb(),
		after: jsonb(),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("audit_logs_org_created_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.createdAt.asc().nullsLast(),
		),
		index("audit_logs_resource_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.resourceType.asc().nullsLast(),
			table.resourceId.asc().nullsLast(),
		),
	],
);
