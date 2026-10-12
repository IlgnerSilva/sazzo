import { sql } from "drizzle-orm";
import {
	index,
	integer,
	jsonb,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const dealStatus = pgEnum("deal_status", [
	"open",
	"won",
	"lost",
	"cancelled",
]);

export const deals = pgTable(
	"deals",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		ownerId: text("owner_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		title: text().notNull(),
		description: text(),
		status: dealStatus().default("open").notNull(),
		value: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		currency: text().default("BRL").notNull(),
		probability: integer().default(0).notNull(),
		expectedCloseAt: timestamp("expected_close_at", { withTimezone: true }),
		closedAt: timestamp("closed_at", { withTimezone: true }),
		lostReason: text("lost_reason"),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("deals_customer_idx").using(
			"btree",
			table.customerId.asc().nullsLast(),
		),
		index("deals_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
