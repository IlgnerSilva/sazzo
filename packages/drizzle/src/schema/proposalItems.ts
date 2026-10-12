import { sql } from "drizzle-orm";
import {
	index,
	integer,
	numeric,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { proposals } from "./proposals.js";

export const proposalItems = pgTable(
	"proposal_items",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		proposalId: text("proposal_id")
			.notNull()
			.references(() => proposals.id, { onDelete: "cascade" }),
		name: text().notNull(),
		description: text(),
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
		discountAmount: numeric("discount_amount", {
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
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("proposal_items_proposal_idx").using(
			"btree",
			table.proposalId.asc().nullsLast(),
		),
	],
);
