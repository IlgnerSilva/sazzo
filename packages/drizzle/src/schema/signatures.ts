import { sql } from "drizzle-orm";
import {
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { contractParticipants } from "./contractParticipants.js";
import { organization } from "./organization.js";
import { signatureRequests } from "./signatureRequests.js";

export const signatureStatus = pgEnum("signature_status", [
	"pending",
	"viewed",
	"signed",
	"declined",
]);

export const signatures = pgTable(
	"signatures",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		signatureRequestId: text("signature_request_id")
			.notNull()
			.references(() => signatureRequests.id, { onDelete: "cascade" }),
		signerId: text("signer_id")
			.notNull()
			.references(() => contractParticipants.id, { onDelete: "cascade" }),
		status: signatureStatus().default("pending").notNull(),
		signedAt: timestamp("signed_at", { withTimezone: true }),
		signatureMethod: text("signature_method"),
		signatureHash: text("signature_hash"),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		evidence: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("signatures_request_signer_uq").using(
			"btree",
			table.signatureRequestId.asc().nullsLast(),
			table.signerId.asc().nullsLast(),
		),
	],
);
