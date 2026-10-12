import { defineRelations } from "drizzle-orm";
import * as schema from "./schema/index.js";

export const relations = defineRelations(schema, (r) => ({
	account: {
		user: r.one.user({
			from: r.account.userId,
			to: r.user.id,
		}),
	},
	user: {
		accounts: r.many.account(),
		activities: r.many.activities(),
		organizationsViaAuditLogs: r.many.organization({
			from: r.user.id.through(r.auditLogs.actorId),
			to: r.organization.id.through(r.auditLogs.organizationId),
			alias: "user_id_organization_id_via_auditLogs",
		}),
		contractParticipants: r.many.contractParticipants(),
		contracts: r.many.contracts(),
		organizationsViaCustomers: r.many.organization({
			from: r.user.id.through(r.customers.createdById),
			to: r.organization.id.through(r.customers.organizationId),
			alias: "user_id_organization_id_via_customers",
		}),
		dealsCreatedById: r.many.deals({
			alias: "deals_createdById_user_id",
		}),
		dealsOwnerId: r.many.deals({
			alias: "deals_ownerId_user_id",
		}),
		documentVersions: r.many.documentVersions(),
		documents: r.many.documents(),
		organizationsViaInvitation: r.many.organization({
			from: r.user.id.through(r.invitation.inviterId),
			to: r.organization.id.through(r.invitation.organizationId),
			alias: "user_id_organization_id_via_invitation",
		}),
		invoices: r.many.invoices(),
		organizationsViaMember: r.many.organization({
			alias: "organization_id_user_id_via_member",
		}),
		organizationsViaNotifications: r.many.organization({
			alias: "organization_id_user_id_via_notifications",
		}),
		proposals: r.many.proposals(),
		sessions: r.many.session(),
		signatureRequests: r.many.signatureRequests(),
		tasksAssignedToId: r.many.tasks({
			alias: "tasks_assignedToId_user_id",
		}),
		tasksCreatedById: r.many.tasks({
			alias: "tasks_createdById_user_id",
		}),
		twoFactors: r.many.twoFactor(),
		workflowVersions: r.many.workflowVersions(),
		organizationsViaWorkflows: r.many.organization({
			from: r.user.id.through(r.workflows.createdById),
			to: r.organization.id.through(r.workflows.organizationId),
			alias: "user_id_organization_id_via_workflows",
		}),
	},
	activities: {
		user: r.one.user({
			from: r.activities.actorId,
			to: r.user.id,
		}),
		customer: r.one.customers({
			from: r.activities.customerId,
			to: r.customers.id,
		}),
		deal: r.one.deals({
			from: r.activities.dealId,
			to: r.deals.id,
		}),
		organization: r.one.organization({
			from: r.activities.organizationId,
			to: r.organization.id,
		}),
	},
	customers: {
		activities: r.many.activities(),
		contracts: r.many.contracts(),
		organizations: r.many.organization({
			from: r.customers.id.through(r.customerContacts.customerId),
			to: r.organization.id.through(r.customerContacts.organizationId),
		}),
		deals: r.many.deals(),
		documents: r.many.documents(),
		invoices: r.many.invoices(),
		payments: r.many.payments(),
		proposals: r.many.proposals(),
		tasks: r.many.tasks(),
	},
	deals: {
		activities: r.many.activities(),
		userCreatedById: r.one.user({
			from: r.deals.createdById,
			to: r.user.id,
			alias: "deals_createdById_user_id",
		}),
		customer: r.one.customers({
			from: r.deals.customerId,
			to: r.customers.id,
		}),
		organization: r.one.organization({
			from: r.deals.organizationId,
			to: r.organization.id,
		}),
		userOwnerId: r.one.user({
			from: r.deals.ownerId,
			to: r.user.id,
			alias: "deals_ownerId_user_id",
		}),
		invoices: r.many.invoices(),
		proposals: r.many.proposals(),
		tasks: r.many.tasks(),
	},
	organization: {
		activities: r.many.activities(),
		usersViaAuditLogs: r.many.user({
			alias: "user_id_organization_id_via_auditLogs",
		}),
		contractParticipants: r.many.contractParticipants(),
		contracts: r.many.contracts(),
		customers: r.many.customers(),
		usersViaCustomers: r.many.user({
			alias: "user_id_organization_id_via_customers",
		}),
		deals: r.many.deals(),
		documentVersions: r.many.documentVersions(),
		documents: r.many.documents(),
		usersViaInvitation: r.many.user({
			alias: "user_id_organization_id_via_invitation",
		}),
		invoicesViaInvoiceItems: r.many.invoices({
			alias: "invoices_id_organization_id_via_invoiceItems",
		}),
		invoicesOrganizationId: r.many.invoices({
			alias: "invoices_organizationId_organization_id",
		}),
		usersViaMember: r.many.user({
			from: r.organization.id.through(r.member.organizationId),
			to: r.user.id.through(r.member.userId),
			alias: "organization_id_user_id_via_member",
		}),
		usersViaNotifications: r.many.user({
			from: r.organization.id.through(r.notifications.organizationId),
			to: r.user.id.through(r.notifications.userId),
			alias: "organization_id_user_id_via_notifications",
		}),
		payments: r.many.payments(),
		proposalsViaProposalItems: r.many.proposals({
			from: r.organization.id.through(r.proposalItems.organizationId),
			to: r.proposals.id.through(r.proposalItems.proposalId),
			alias: "organization_id_proposals_id_via_proposalItems",
		}),
		proposalsOrganizationId: r.many.proposals({
			alias: "proposals_organizationId_organization_id",
		}),
		proposalsViaPublicAccessTokens: r.many.proposals({
			from: r.organization.id.through(r.publicAccessTokens.organizationId),
			to: r.proposals.id.through(r.publicAccessTokens.proposalId),
			alias: "organization_id_proposals_id_via_publicAccessTokens",
		}),
		signatureRequests: r.many.signatureRequests(),
		signatures: r.many.signatures(),
		tasks: r.many.tasks(),
		workflowExecutionsViaWorkflowExecutionSteps: r.many.workflowExecutions({
			alias: "workflowExecutions_id_organization_id_via_workflowExecutionSteps",
		}),
		workflowExecutionsOrganizationId: r.many.workflowExecutions({
			alias: "workflowExecutions_organizationId_organization_id",
		}),
		workflowVersions: r.many.workflowVersions(),
		usersViaWorkflows: r.many.user({
			alias: "user_id_organization_id_via_workflows",
		}),
	},
	contractParticipants: {
		contract: r.one.contracts({
			from: r.contractParticipants.contractId,
			to: r.contracts.id,
		}),
		organization: r.one.organization({
			from: r.contractParticipants.organizationId,
			to: r.organization.id,
		}),
		user: r.one.user({
			from: r.contractParticipants.userId,
			to: r.user.id,
		}),
		signatures: r.many.signatures(),
	},
	contracts: {
		contractParticipants: r.many.contractParticipants(),
		user: r.one.user({
			from: r.contracts.createdById,
			to: r.user.id,
		}),
		customer: r.one.customers({
			from: r.contracts.customerId,
			to: r.customers.id,
		}),
		organization: r.one.organization({
			from: r.contracts.organizationId,
			to: r.organization.id,
		}),
		proposal: r.one.proposals({
			from: r.contracts.proposalId,
			to: r.proposals.id,
		}),
		invoices: r.many.invoices(),
		signatureRequests: r.many.signatureRequests(),
	},
	proposals: {
		contracts: r.many.contracts(),
		organizationsViaProposalItems: r.many.organization({
			alias: "organization_id_proposals_id_via_proposalItems",
		}),
		user: r.one.user({
			from: r.proposals.createdById,
			to: r.user.id,
		}),
		customer: r.one.customers({
			from: r.proposals.customerId,
			to: r.customers.id,
		}),
		deal: r.one.deals({
			from: r.proposals.dealId,
			to: r.deals.id,
		}),
		organization: r.one.organization({
			from: r.proposals.organizationId,
			to: r.organization.id,
			alias: "proposals_organizationId_organization_id",
		}),
		organizationsViaPublicAccessTokens: r.many.organization({
			alias: "organization_id_proposals_id_via_publicAccessTokens",
		}),
	},
	documentVersions: {
		user: r.one.user({
			from: r.documentVersions.createdById,
			to: r.user.id,
		}),
		document: r.one.documents({
			from: r.documentVersions.documentId,
			to: r.documents.id,
		}),
		organization: r.one.organization({
			from: r.documentVersions.organizationId,
			to: r.organization.id,
		}),
	},
	documents: {
		documentVersions: r.many.documentVersions(),
		customer: r.one.customers({
			from: r.documents.customerId,
			to: r.customers.id,
		}),
		organization: r.one.organization({
			from: r.documents.organizationId,
			to: r.organization.id,
		}),
		user: r.one.user({
			from: r.documents.uploadedById,
			to: r.user.id,
		}),
	},
	invoices: {
		organizations: r.many.organization({
			from: r.invoices.id.through(r.invoiceItems.invoiceId),
			to: r.organization.id.through(r.invoiceItems.organizationId),
			alias: "invoices_id_organization_id_via_invoiceItems",
		}),
		contract: r.one.contracts({
			from: r.invoices.contractId,
			to: r.contracts.id,
		}),
		user: r.one.user({
			from: r.invoices.createdById,
			to: r.user.id,
		}),
		customer: r.one.customers({
			from: r.invoices.customerId,
			to: r.customers.id,
		}),
		deal: r.one.deals({
			from: r.invoices.dealId,
			to: r.deals.id,
		}),
		organization: r.one.organization({
			from: r.invoices.organizationId,
			to: r.organization.id,
			alias: "invoices_organizationId_organization_id",
		}),
		payments: r.many.payments(),
	},
	payments: {
		customer: r.one.customers({
			from: r.payments.customerId,
			to: r.customers.id,
		}),
		invoice: r.one.invoices({
			from: r.payments.invoiceId,
			to: r.invoices.id,
		}),
		organization: r.one.organization({
			from: r.payments.organizationId,
			to: r.organization.id,
		}),
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id,
		}),
	},
	signatureRequests: {
		contract: r.one.contracts({
			from: r.signatureRequests.contractId,
			to: r.contracts.id,
		}),
		organization: r.one.organization({
			from: r.signatureRequests.organizationId,
			to: r.organization.id,
		}),
		user: r.one.user({
			from: r.signatureRequests.requestedById,
			to: r.user.id,
		}),
		signatures: r.many.signatures(),
	},
	signatures: {
		organization: r.one.organization({
			from: r.signatures.organizationId,
			to: r.organization.id,
		}),
		signatureRequest: r.one.signatureRequests({
			from: r.signatures.signatureRequestId,
			to: r.signatureRequests.id,
		}),
		contractParticipant: r.one.contractParticipants({
			from: r.signatures.signerId,
			to: r.contractParticipants.id,
		}),
	},
	tasks: {
		userAssignedToId: r.one.user({
			from: r.tasks.assignedToId,
			to: r.user.id,
			alias: "tasks_assignedToId_user_id",
		}),
		userCreatedById: r.one.user({
			from: r.tasks.createdById,
			to: r.user.id,
			alias: "tasks_createdById_user_id",
		}),
		customer: r.one.customers({
			from: r.tasks.customerId,
			to: r.customers.id,
		}),
		deal: r.one.deals({
			from: r.tasks.dealId,
			to: r.deals.id,
		}),
		organization: r.one.organization({
			from: r.tasks.organizationId,
			to: r.organization.id,
		}),
	},
	twoFactor: {
		user: r.one.user({
			from: r.twoFactor.userId,
			to: r.user.id,
		}),
	},
	workflowExecutions: {
		organizations: r.many.organization({
			from: r.workflowExecutions.id.through(
				r.workflowExecutionSteps.executionId,
			),
			to: r.organization.id.through(r.workflowExecutionSteps.organizationId),
			alias: "workflowExecutions_id_organization_id_via_workflowExecutionSteps",
		}),
		workflowVersion: r.one.workflowVersions({
			from: r.workflowExecutions.workflowVersionId,
			to: r.workflowVersions.id,
		}),
		organization: r.one.organization({
			from: r.workflowExecutions.organizationId,
			to: r.organization.id,
			alias: "workflowExecutions_organizationId_organization_id",
		}),
		workflow: r.one.workflows({
			from: r.workflowExecutions.workflowId,
			to: r.workflows.id,
		}),
	},
	workflowVersions: {
		workflowExecutions: r.many.workflowExecutions(),
		user: r.one.user({
			from: r.workflowVersions.createdById,
			to: r.user.id,
		}),
		organization: r.one.organization({
			from: r.workflowVersions.organizationId,
			to: r.organization.id,
		}),
		workflow: r.one.workflows({
			from: r.workflowVersions.workflowId,
			to: r.workflows.id,
		}),
	},
	workflows: {
		workflowExecutions: r.many.workflowExecutions(),
		workflowVersions: r.many.workflowVersions(),
	},
}));
