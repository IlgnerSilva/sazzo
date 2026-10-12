import { sql } from "drizzle-orm";
import { index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { deals } from "./deal.js";
import { organization } from "./organization.js";
import { user } from "./user.js";
export const activities = pgTable(
	"activities",
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
		actorId: text("actor_id").references(() => user.id, {
			onDelete: "set null",
		}),
		type: text().notNull(),
		title: text().notNull(),
		description: text(),
		occurredAt: timestamp("occurred_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("activities_customer_idx").using(
			"btree",
			table.customerId.asc().nullsLast(),
		),
		index("activities_org_occurred_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.occurredAt.asc().nullsLast(),
		),
	],
);
