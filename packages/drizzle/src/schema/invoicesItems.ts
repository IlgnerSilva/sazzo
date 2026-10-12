import { sql } from "drizzle-orm";
import {
	index,
	integer,
	numeric,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { invoices } from "./invoices.js";
import { organization } from "./organization.js";

export const invoiceItems = pgTable(
	"invoice_items",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		invoiceId: text("invoice_id")
			.notNull()
			.references(() => invoices.id, { onDelete: "cascade" }),
		description: text().notNull(),
		quantity: numeric({ mode: "number", precision: 12, scale: 3 })
			.default(1)
			.notNull(),
		unitPrice: numeric("unit_price", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		total: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		position: integer().default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("invoice_items_invoice_idx").using(
			"btree",
			table.invoiceId.asc().nullsLast(),
		),
	],
);
