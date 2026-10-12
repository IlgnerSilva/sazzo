import { sql } from "drizzle-orm";
import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { organization } from "./organization.js";

export const customerContacts = pgTable(
	"customer_contacts",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id")
			.notNull()
			.references(() => customers.id, { onDelete: "cascade" }),
		name: text().notNull(),
		email: text(),
		phone: text(),
		role: text(),
		isPrimary: boolean("is_primary").default(false).notNull(),
		notes: text(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("customer_contacts_customer_idx").using(
			"btree",
			table.customerId.asc().nullsLast(),
		),
	],
);
