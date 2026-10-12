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
import { workflowExecutions } from "./workflowExecution.js";

export const workflowExecutionStatus = pgEnum("workflow_execution_status", [
	"queued",
	"running",
	"succeeded",
	"failed",
	"cancelled",
]);

export const workflowExecutionSteps = pgTable(
	"workflow_execution_steps",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		executionId: text("execution_id")
			.notNull()
			.references(() => workflowExecutions.id, { onDelete: "cascade" }),
		stepKey: text("step_key").notNull(),
		stepType: text("step_type").notNull(),
		status: workflowExecutionStatus().default("queued").notNull(),
		input: jsonb(),
		output: jsonb(),
		errorMessage: text("error_message"),
		startedAt: timestamp("started_at", { withTimezone: true }),
		finishedAt: timestamp("finished_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("workflow_execution_steps_execution_idx").using(
			"btree",
			table.executionId.asc().nullsLast(),
		),
	],
);
