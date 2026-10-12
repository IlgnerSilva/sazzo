import { sql } from "drizzle-orm";
import {
	index,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { organization } from "./organization.js";
import { proposals } from "./proposals.js";
import { user } from "./user.js";

export const contractStatus = pgEnum("contract_status", [
	"draft",
	"pending_signature",
	"signed",
	"expired",
	"cancelled",
]);

export const contracts = pgTable(
	"contracts",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		proposalId: text("proposal_id").references(() => proposals.id, {
			onDelete: "set null",
		}),
		documentId: text("document_id"),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		number: text().notNull(),
		title: text().notNull(),
		status: contractStatus().default("draft").notNull(),
		content: text(),
		startAt: timestamp("start_at", { withTimezone: true }),
		endAt: timestamp("end_at", { withTimezone: true }),
		signedAt: timestamp("signed_at", { withTimezone: true }),
		cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("contracts_org_number_uq").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.number.asc().nullsLast(),
		),
		index("contracts_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
