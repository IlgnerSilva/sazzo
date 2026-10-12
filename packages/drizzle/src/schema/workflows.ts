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

export const workflowStatus = pgEnum("workflow_status", [
	"draft",
	"active",
	"paused",
	"archived",
]);

export const workflows = pgTable(
	"workflows",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		name: text().notNull(),
		description: text(),
		status: workflowStatus().default("draft").notNull(),
		triggerType: text("trigger_type").notNull(),
		triggerConfig: jsonb("trigger_config"),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("workflows_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
