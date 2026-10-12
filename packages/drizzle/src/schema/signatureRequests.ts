import { sql } from "drizzle-orm";
import { index, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { contracts } from "./contracts.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const signatureRequestStatus = pgEnum("signature_request_status", [
	"draft",
	"sent",
	"in_progress",
	"completed",
	"declined",
	"expired",
	"cancelled",
]);

export const signatureRequests = pgTable(
	"signature_requests",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		contractId: text("contract_id").references(() => contracts.id, {
			onDelete: "set null",
		}),
		documentId: text("document_id"),
		requestedById: text("requested_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		status: signatureRequestStatus().default("draft").notNull(),
		subject: text(),
		message: text(),
		expiresAt: timestamp("expires_at", { withTimezone: true }),
		sentAt: timestamp("sent_at", { withTimezone: true }),
		completedAt: timestamp("completed_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("signature_requests_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
