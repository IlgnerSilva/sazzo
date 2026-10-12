import { sql } from "drizzle-orm";
import {
	index,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { deals } from "./deal.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const proposalStatus = pgEnum("proposal_status", [
	"draft",
	"sent",
	"viewed",
	"accepted",
	"rejected",
	"expired",
	"cancelled",
]);

export const proposals = pgTable(
	"proposals",
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
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		number: text().notNull(),
		title: text().notNull(),
		status: proposalStatus().default("draft").notNull(),
		currency: text().default("BRL").notNull(),
		subtotal: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		discountAmount: numeric("discount_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		taxAmount: numeric("tax_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		total: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		intro: text(),
		terms: text(),
		validUntil: timestamp("valid_until", { withTimezone: true }),
		sentAt: timestamp("sent_at", { withTimezone: true }),
		acceptedAt: timestamp("accepted_at", { withTimezone: true }),
		rejectedAt: timestamp("rejected_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("proposals_org_number_uq").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.number.asc().nullsLast(),
		),
		index("proposals_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
