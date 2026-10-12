import { sql } from "drizzle-orm";
import {
	integer,
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { user } from "./user.js";
import { workflows } from "./workflows.js";

export const workflowVersions = pgTable(
	"workflow_versions",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		workflowId: text("workflow_id")
			.notNull()
			.references(() => workflows.id, { onDelete: "cascade" }),
		version: integer().notNull(),
		definition: jsonb().notNull(),
		publishedAt: timestamp("published_at", { withTimezone: true }),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("workflow_versions_workflow_version_uq").using(
			"btree",
			table.workflowId.asc().nullsLast(),
			table.version.asc().nullsLast(),
		),
	],
);
