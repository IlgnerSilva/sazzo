import { sql } from "drizzle-orm";
import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { deals } from "./deal.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const taskStatus = pgEnum("task_status", [
	"todo",
	"in_progress",
	"done",
	"cancelled",
]);

export const tasks = pgTable(
	"tasks",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		dealId: text("deal_id").references(() => deals.id, {
			onDelete: "set null",
		}),
		assignedToId: text("assigned_to_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		title: text().notNull(),
		description: text(),
		status: taskStatus().default("todo").notNull(),
		priority: text().default("normal").notNull(),
		dueAt: timestamp("due_at", { withTimezone: true }),
		completedAt: timestamp("completed_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("tasks_org_due_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.dueAt.asc().nullsLast(),
		),
		index("tasks_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
