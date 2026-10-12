import { sql } from "drizzle-orm";
import {
	index,
	jsonb,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { invoices } from "./invoices.js";
import { organization } from "./organization.js";

export const paymentStatus = pgEnum("payment_status", [
	"pending",
	"succeeded",
	"failed",
	"refunded",
	"cancelled",
]);

export const payments = pgTable(
	"payments",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		invoiceId: text("invoice_id").references(() => invoices.id, {
			onDelete: "set null",
		}),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		provider: text(),
		providerPaymentId: text("provider_payment_id"),
		status: paymentStatus().default("pending").notNull(),
		amount: numeric({ precision: 14, scale: 2 }).notNull(),
		currency: text().default("BRL").notNull(),
		paymentMethod: text("payment_method"),
		paidAt: timestamp("paid_at", { withTimezone: true }),
		refundedAt: timestamp("refunded_at", { withTimezone: true }),
		failureReason: text("failure_reason"),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("payments_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
		uniqueIndex("payments_provider_payment_uq").using(
			"btree",
			table.provider.asc().nullsLast(),
			table.providerPaymentId.asc().nullsLast(),
		),
	],
);
