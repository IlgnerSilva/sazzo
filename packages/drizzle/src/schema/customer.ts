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

export const customerStatus = pgEnum("customer_status", [
	"lead",
	"active",
	"inactive",
	"archived",
]);

export const customers = pgTable(
	"customers",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		name: text().notNull(),
		legalName: text("legal_name"),
		email: text(),
		phone: text(),
		taxId: text("tax_id"),
		website: text(),
		status: customerStatus().default("lead").notNull(),
		source: text(),
		notes: text(),
		metadata: jsonb(),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		deletedAt: timestamp("deleted_at", { withTimezone: true }),
	},
	(table) => [
		index("customers_org_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
		index("customers_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
