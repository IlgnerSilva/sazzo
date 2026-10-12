import { sql } from "drizzle-orm";
import { index, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { contracts } from "./contracts.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const contractParticipants = pgTable(
	"contract_participants",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		contractId: text("contract_id")
			.notNull()
			.references(() => contracts.id, { onDelete: "cascade" }),
		userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
		name: text().notNull(),
		email: text().notNull(),
		role: text().default("signer").notNull(),
		signingOrder: integer("signing_order").default(1).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("contract_participants_contract_idx").using(
			"btree",
			table.contractId.asc().nullsLast(),
		),
	],
);
