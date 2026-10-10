import { sql } from "drizzle-orm";
import {
	boolean,
	index,
	integer,
	jsonb,
	numeric,
	pgEnum,
	pgTable,
	text,
	timestamp,
	unique,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const contractStatus = pgEnum("contract_status", [
	"draft",
	"pending_signature",
	"signed",
	"expired",
	"cancelled",
]);
export const customerStatus = pgEnum("customer_status", [
	"lead",
	"active",
	"inactive",
	"archived",
]);
export const dealStatus = pgEnum("deal_status", [
	"open",
	"won",
	"lost",
	"cancelled",
]);
export const documentStatus = pgEnum("document_status", [
	"draft",
	"ready",
	"sent",
	"completed",
	"archived",
]);
export const workflowExecutionStatus = pgEnum("workflow_execution_status", [
	"queued",
	"running",
	"succeeded",
	"failed",
	"cancelled",
]);
export const invoiceStatus = pgEnum("invoice_status", [
	"draft",
	"open",
	"paid",
	"overdue",
	"cancelled",
	"refunded",
]);
export const notificationStatus = pgEnum("notification_status", [
	"unread",
	"read",
	"archived",
]);
export const paymentStatus = pgEnum("payment_status", [
	"pending",
	"succeeded",
	"failed",
	"refunded",
	"cancelled",
]);
export const proposalStatus = pgEnum("proposal_status", [
	"draft",
	"sent",
	"viewed",
	"accepted",
	"rejected",
	"expired",
	"cancelled",
]);
export const signatureRequestStatus = pgEnum("signature_request_status", [
	"draft",
	"sent",
	"in_progress",
	"completed",
	"declined",
	"expired",
	"cancelled",
]);
export const signatureStatus = pgEnum("signature_status", [
	"pending",
	"viewed",
	"signed",
	"declined",
]);
export const taskStatus = pgEnum("task_status", [
	"todo",
	"in_progress",
	"done",
	"cancelled",
]);
export const workflowStatus = pgEnum("workflow_status", [
	"draft",
	"active",
	"paused",
	"archived",
]);

export const account = pgTable(
	"account",
	{
		id: text().primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text(),
		password: text(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		updatedAt: timestamp("updated_at").notNull(),
	},
	(table) => [
		index("account_userId_idx").using("btree", table.userId.asc().nullsLast()),
	],
);

export const activities = pgTable(
	"activities",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		dealId: text("deal_id").references(() => deals.id, {
			onDelete: "set null",
		}),
		actorId: text("actor_id").references(() => user.id, {
			onDelete: "set null",
		}),
		type: text().notNull(),
		title: text().notNull(),
		description: text(),
		occurredAt: timestamp("occurred_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("activities_customer_idx").using(
			"btree",
			table.customerId.asc().nullsLast(),
		),
		index("activities_org_occurred_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.occurredAt.asc().nullsLast(),
		),
	],
);

export const auditLogs = pgTable(
	"audit_logs",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		actorId: text("actor_id").references(() => user.id, {
			onDelete: "set null",
		}),
		action: text().notNull(),
		resourceType: text("resource_type").notNull(),
		resourceId: text("resource_id"),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		before: jsonb(),
		after: jsonb(),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("audit_logs_org_created_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.createdAt.asc().nullsLast(),
		),
		index("audit_logs_resource_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.resourceType.asc().nullsLast(),
			table.resourceId.asc().nullsLast(),
		),
	],
);

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

export const customers = pgTable(
	"customers",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		name: text().notNull(),
		legalName: text("legal_name"),
		email: text(),
		phone: text(),
		taxId: text("tax_id"),
		website: text(),
		status: customerStatus().default("lead").notNull(),
		source: text(),
		notes: text(),
		metadata: jsonb(),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		deletedAt: timestamp("deleted_at", { withTimezone: true }),
	},
	(table) => [
		index("customers_org_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
		index("customers_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

export const deals = pgTable(
	"deals",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		ownerId: text("owner_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		title: text().notNull(),
		description: text(),
		status: dealStatus().default("open").notNull(),
		value: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		currency: text().default("BRL").notNull(),
		probability: integer().default(0).notNull(),
		expectedCloseAt: timestamp("expected_close_at", { withTimezone: true }),
		closedAt: timestamp("closed_at", { withTimezone: true }),
		lostReason: text("lost_reason"),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("deals_customer_idx").using(
			"btree",
			table.customerId.asc().nullsLast(),
		),
		index("deals_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

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

export const invitation = pgTable(
	"invitation",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		email: text().notNull(),
		role: text(),
		status: text().default("pending").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		inviterId: text("inviter_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
	},
	(table) => [
		index("invitation_email_idx").using("btree", table.email.asc().nullsLast()),
		index("invitation_organizationId_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
	],
);

export const invoiceItems = pgTable(
	"invoice_items",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		invoiceId: text("invoice_id")
			.notNull()
			.references(() => invoices.id, { onDelete: "cascade" }),
		description: text().notNull(),
		quantity: numeric({ mode: "number", precision: 12, scale: 3 })
			.default(1)
			.notNull(),
		unitPrice: numeric("unit_price", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		total: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		position: integer().default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("invoice_items_invoice_idx").using(
			"btree",
			table.invoiceId.asc().nullsLast(),
		),
	],
);

export const invoices = pgTable(
	"invoices",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		dealId: text("deal_id").references(() => deals.id, {
			onDelete: "set null",
		}),
		contractId: text("contract_id").references(() => contracts.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		number: text().notNull(),
		status: invoiceStatus().default("draft").notNull(),
		currency: text().default("BRL").notNull(),
		subtotal: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		discountAmount: numeric("discount_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		taxAmount: numeric("tax_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		total: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		dueAt: timestamp("due_at", { withTimezone: true }),
		paidAt: timestamp("paid_at", { withTimezone: true }),
		notes: text(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("invoices_org_number_uq").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.number.asc().nullsLast(),
		),
		index("invoices_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

export const member = pgTable(
	"member",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		role: text().default("member").notNull(),
		createdAt: timestamp("created_at").notNull(),
	},
	(table) => [
		index("member_organizationId_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
		),
		index("member_userId_idx").using("btree", table.userId.asc().nullsLast()),
	],
);

export const notifications = pgTable(
	"notifications",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		type: text().notNull(),
		title: text().notNull(),
		body: text(),
		status: notificationStatus().default("unread").notNull(),
		actionUrl: text("action_url"),
		data: jsonb(),
		readAt: timestamp("read_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("notifications_user_status_idx").using(
			"btree",
			table.userId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

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

export const payments = pgTable(
	"payments",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		invoiceId: text("invoice_id").references(() => invoices.id, {
			onDelete: "set null",
		}),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		provider: text(),
		providerPaymentId: text("provider_payment_id"),
		status: paymentStatus().default("pending").notNull(),
		amount: numeric({ precision: 14, scale: 2 }).notNull(),
		currency: text().default("BRL").notNull(),
		paymentMethod: text("payment_method"),
		paidAt: timestamp("paid_at", { withTimezone: true }),
		refundedAt: timestamp("refunded_at", { withTimezone: true }),
		failureReason: text("failure_reason"),
		metadata: jsonb(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("payments_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
		uniqueIndex("payments_provider_payment_uq").using(
			"btree",
			table.provider.asc().nullsLast(),
			table.providerPaymentId.asc().nullsLast(),
		),
	],
);

export const proposalItems = pgTable(
	"proposal_items",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		proposalId: text("proposal_id")
			.notNull()
			.references(() => proposals.id, { onDelete: "cascade" }),
		name: text().notNull(),
		description: text(),
		quantity: numeric({ mode: "number", precision: 12, scale: 3 })
			.default(1)
			.notNull(),
		unitPrice: numeric("unit_price", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		discountAmount: numeric("discount_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		total: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		position: integer().default(0).notNull(),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("proposal_items_proposal_idx").using(
			"btree",
			table.proposalId.asc().nullsLast(),
		),
	],
);

export const proposals = pgTable(
	"proposals",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		dealId: text("deal_id").references(() => deals.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		number: text().notNull(),
		title: text().notNull(),
		status: proposalStatus().default("draft").notNull(),
		currency: text().default("BRL").notNull(),
		subtotal: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		discountAmount: numeric("discount_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		taxAmount: numeric("tax_amount", {
			mode: "number",
			precision: 14,
			scale: 2,
		})
			.default(0)
			.notNull(),
		total: numeric({ mode: "number", precision: 14, scale: 2 })
			.default(0)
			.notNull(),
		intro: text(),
		terms: text(),
		validUntil: timestamp("valid_until", { withTimezone: true }),
		sentAt: timestamp("sent_at", { withTimezone: true }),
		acceptedAt: timestamp("accepted_at", { withTimezone: true }),
		rejectedAt: timestamp("rejected_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("proposals_org_number_uq").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.number.asc().nullsLast(),
		),
		index("proposals_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

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

export const session = pgTable(
	"session",
	{
		id: text().primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text().notNull(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		updatedAt: timestamp("updated_at").notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => user.id, { onDelete: "cascade" }),
		impersonatedBy: text("impersonated_by"),
		activeOrganizationId: text("active_organization_id"),
	},
	(table) => [
		index("session_userId_idx").using("btree", table.userId.asc().nullsLast()),
		unique("session_token_key").on(table.token),
	],
);

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

export const tasks = pgTable(
	"tasks",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		customerId: text("customer_id").references(() => customers.id, {
			onDelete: "set null",
		}),
		dealId: text("deal_id").references(() => deals.id, {
			onDelete: "set null",
		}),
		assignedToId: text("assigned_to_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		title: text().notNull(),
		description: text(),
		status: taskStatus().default("todo").notNull(),
		priority: text().default("normal").notNull(),
		dueAt: timestamp("due_at", { withTimezone: true }),
		completedAt: timestamp("completed_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("tasks_org_due_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.dueAt.asc().nullsLast(),
		),
		index("tasks_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

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

export const user = pgTable(
	"user",
	{
		id: text().primaryKey(),
		name: text().notNull(),
		email: text().notNull(),
		emailVerified: boolean("email_verified").default(false).notNull(),
		image: text(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
		role: text(),
		banned: boolean().default(false),
		banReason: text("ban_reason"),
		banExpires: timestamp("ban_expires"),
		twoFactorEnabled: boolean("two_factor_enabled").default(false),
	},
	(table) => [unique("user_email_key").on(table.email)],
);

export const verification = pgTable(
	"verification",
	{
		id: text().primaryKey(),
		identifier: text().notNull(),
		value: text().notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").default(sql`now()`).notNull(),
		updatedAt: timestamp("updated_at").default(sql`now()`).notNull(),
	},
	(table) => [
		index("verification_identifier_idx").using(
			"btree",
			table.identifier.asc().nullsLast(),
		),
	],
);

export const workflowExecutionSteps = pgTable(
	"workflow_execution_steps",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		executionId: text("execution_id")
			.notNull()
			.references(() => workflowExecutions.id, { onDelete: "cascade" }),
		stepKey: text("step_key").notNull(),
		stepType: text("step_type").notNull(),
		status: workflowExecutionStatus().default("queued").notNull(),
		input: jsonb(),
		output: jsonb(),
		errorMessage: text("error_message"),
		startedAt: timestamp("started_at", { withTimezone: true }),
		finishedAt: timestamp("finished_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("workflow_execution_steps_execution_idx").using(
			"btree",
			table.executionId.asc().nullsLast(),
		),
	],
);

export const workflowExecutions = pgTable(
	"workflow_executions",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		workflowId: text("workflow_id")
			.notNull()
			.references(() => workflows.id, { onDelete: "cascade" }),
		workflowVersionId: text("workflow_version_id").references(
			() => workflowVersions.id,
			{ onDelete: "set null" },
		),
		status: workflowExecutionStatus().default("queued").notNull(),
		triggerPayload: jsonb("trigger_payload"),
		result: jsonb(),
		errorMessage: text("error_message"),
		startedAt: timestamp("started_at", { withTimezone: true }),
		finishedAt: timestamp("finished_at", { withTimezone: true }),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("workflow_executions_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);

export const workflowVersions = pgTable(
	"workflow_versions",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		workflowId: text("workflow_id")
			.notNull()
			.references(() => workflows.id, { onDelete: "cascade" }),
		version: integer().notNull(),
		definition: jsonb().notNull(),
		publishedAt: timestamp("published_at", { withTimezone: true }),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		uniqueIndex("workflow_versions_workflow_version_uq").using(
			"btree",
			table.workflowId.asc().nullsLast(),
			table.version.asc().nullsLast(),
		),
	],
);

export const workflows = pgTable(
	"workflows",
	{
		id: text().primaryKey(),
		organizationId: text("organization_id")
			.notNull()
			.references(() => organization.id, { onDelete: "cascade" }),
		createdById: text("created_by_id").references(() => user.id, {
			onDelete: "set null",
		}),
		name: text().notNull(),
		description: text(),
		status: workflowStatus().default("draft").notNull(),
		triggerType: text("trigger_type").notNull(),
		triggerConfig: jsonb("trigger_config"),
		createdAt: timestamp("created_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
		updatedAt: timestamp("updated_at", { withTimezone: true })
			.default(sql`now()`)
			.notNull(),
	},
	(table) => [
		index("workflows_org_status_idx").using(
			"btree",
			table.organizationId.asc().nullsLast(),
			table.status.asc().nullsLast(),
		),
	],
);
