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
import { contracts } from "./contracts.js";
import { customers } from "./customer.js";
import { deals } from "./deal.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const invoiceStatus = pgEnum("invoice_status", [
	"draft",
	"open",
	"paid",
	"overdue",
	"cancelled",
	"refunded",
]);

export const invoices = pgTable(
	"invoices",
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
		contractId: text("contract_id").references(() => contracts.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		number: text().notNull(),
		status: invoiceStatus().default("draft").notNull(),
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
		dueAt: timestamp("due_at", { withTimezone: true }),
		paidAt: timestamp("paid_at", { withTimezone: true }),
		notes: text(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("invoices_org_number_uq").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.number.asc().nullsLast(),
		),
		index("invoices_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
