import {
	pgTable,
	text,
	timestamp,
	unique,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const organization = pgTable(
	"organization",
	{
		id: text().primaryKey(),
		name: text().notNull(),
		slug: text().notNull(),
		logo: text(),
		createdAt: timestamp("created_at").notNull(),
		metadata: text(),
	},
	(table) => [
		uniqueIndex("organization_slug_uidx").using(
			"btree",
			table.slug.asc().nullsLast(),
		),
		unique("organization_slug_key").on(table.slug),
	],
);
