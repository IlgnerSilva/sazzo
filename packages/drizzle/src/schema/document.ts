import { sql } from "drizzle-orm";
import {
	index,
	integer,
	jsonb,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { customers } from "./customer.js";
import { organization } from "./organization.js";
import { user } from "./user.js";

export const documentStatus = pgEnum("document_status", [
	"draft",
	"ready",
	"sent",
	"completed",
	"archived",
]);

export const documents = pgTable(
	"documents",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		uploadedById: text("uploaded_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		name: text().notNull(),
		originalFileName: text("original_file_name").notNull(),
		mimeType: text("mime_type").notNull(),
		sizeBytes: integer("size_bytes").notNull(),
		storageKey: text("storage_key").notNull(),
		checksum: text(),
		status: documentStatus().default("draft").notNull(),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		deletedAt: timestamp("deleted_at", { withTimezone: true }),
	},
	(table) => [
		index("documents_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
