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
import { workflows } from "./workflows.js";
import { workflowVersions } from "./workflowVersions.js";

export const workflowExecutionStatus = pgEnum("workflow_execution_status", [
	"queued",
	"running",
	"succeeded",
	"failed",
	"cancelled",
]);

export const workflowExecutions = pgTable(
	"workflow_executions",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		workflowId: text("workflow_id")
			.notNull()
			.references(() => workflows.id, { onDelete: "cascade" }),
		workflowVersionId: text("workflow_version_id").references(
			() => workflowVersions.id,
			{ onDelete: "set null" },
		),
		status: workflowExecutionStatus().default("queued").notNull(),
		triggerPayload: jsonb("trigger_payload"),
		result: jsonb(),
		errorMessage: text("error_message"),
		startedAt: timestamp("started_at", { withTimezone: true }),
		finishedAt: timestamp("finished_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("workflow_executions_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
