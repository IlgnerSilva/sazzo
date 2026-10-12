import { sql } from "drizzle-orm";
import {
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { organization } from "./organization.js";
import { proposals } from "./proposals.js";

export const publicAccessTokens = pgTable(
	"public_access_tokens",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		proposalId: text("proposal_id").references(() => proposals.id, {
			onDelete: "cascade",
		}),
		contractId: text("contract_id"),
		tokenHash: text("token_hash").notNull(),
		purpose: text().notNull(),
		expiresAt: timestamp("expires_at", { withTimezone: true }),
		revokedAt: timestamp("revoked_at", { withTimezone: true }),
		lastAccessedAt: timestamp("last_accessed_at", { withTimezone: true }),
		accessCount: integer("access_count").default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("public_access_token_hash_uq").using(
			"btree",
			table.tokenHash.asc().nullsLast(),
		),
		index("public_access_token_org_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
	],
);
