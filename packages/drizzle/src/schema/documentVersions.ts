import { sql } from "drizzle-orm";
import {
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { documents } from "./document.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const documentVersions = pgTable(
	"document_versions",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		documentId: text("document_id")
			.notNull()
			.references(() => documents.id, { onDelete: "cascade" }),
		version: integer().notNull(),
		storageKey: text("storage_key").notNull(),
		checksum: text(),
		sizeBytes: integer("size_bytes").notNull(),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		changeNote: text("change_note"),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("document_versions_document_version_uq").using(
			"btree",
			table.documentId.asc().nullsLast(),
			table.version.asc().nullsLast(),
		),
	],
);
