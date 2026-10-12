import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./user.js";

export const twoFactor = pgTable(
	"two_factor",
	{
		id: text().primaryKey(),
		secret: text().notNull(),
		backupCodes: text("backup_codes").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		verified: boolean().default(true),
		failedVerificationCount: integer("failed_verification_count").default(0),
		lockedUntil: timestamp("locked_until"),
	},
	(table) => [
		index("twoFactor_secret_idx").using(
			"btree",
			table.secret.asc().nullsLast(),
		),
		index("twoFactor_userId_idx").using(
			"btree",
			table.userId.asc().nullsLast(),
		),
	],
);
