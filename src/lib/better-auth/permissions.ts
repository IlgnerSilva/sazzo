// permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";
import {
	adminAc as orgAdminAc,
	defaultStatements as orgDefaultStatements,
} from "better-auth/plugins/organization/access";

/**
 * Definição dos recursos e ações disponíveis no sistema
 */
export const statement = {
	// Recursos padrão do better-auth
	...defaultStatements,
	...orgDefaultStatements,

	// Recursos específicos do SaaS de documentos
	document: [
		"create", // Criar documentos
		"read", // Visualizar documentos
		"update", // Editar documentos
		"delete", // Excluir documentos
		"sign", // Assinar documentos
		"send", // Enviar para assinatura
		"download", // Baixar documentos
		"duplicate", // Duplicar documentos
		"template", // Criar/usar templates
		"audit", // Visualizar logs de auditoria
		"archive", // Arquivar documentos
	],

	signature: [
		"create", // Criar assinaturas
		"validate", // Validar assinaturas
		"revoke", // Revogar assinaturas
	],

	template: [
		"create", // Criar templates
		"read", // Visualizar templates
		"update", // Editar templates
		"delete", // Excluir templates
		"use", // Usar templates
		"share", // Compartilhar templates
	],

	organization: [
		"create", // Criar organizações
		"read", // Visualizar dados da org
		"update", // Editar configurações
		"delete", // Excluir organização
		"invite", // Convidar usuários
		"manage-members", // Gerenciar membros
		"billing", // Gerenciar cobrança
	],

	workspace: [
		"create", // Criar workspaces
		"read", // Visualizar workspaces
		"update", // Editar workspaces
		"delete", // Excluir workspaces
		"manage", // Gerenciar configurações
	],

	analytics: [
		"view-basic", // Ver analytics básicos
		"view-advanced", // Ver analytics avançados
		"export", // Exportar relatórios
	],

	integration: [
		"create", // Criar integrações
		"read", // Ver integrações
		"update", // Editar integrações
		"delete", // Remover integrações
	],

	audit: [
		"read", // Ver logs de auditoria
		"export", // Exportar logs
	],

	billing: [
		"view", // Ver informações de cobrança
		"manage", // Gerenciar cobrança
	],

	// Recurso para controle do SaaS (super admin)
	saas: [
		"manage-users", // Gerenciar todos os usuários
		"manage-orgs", // Gerenciar organizações
		"manage-plans", // Gerenciar planos
		"view-analytics", // Analytics globais
		"manage-system", // Configurações do sistema
	],
} as const;

const ac = createAccessControl(statement);

/**
 * PERFIS DO SISTEMA
 */

/**
 * PLANO COMMUNITY (Gratuito/Básico)
 * - Usuários individuais
 * - Funcionalidades limitadas
 */
export const community = ac.newRole({
	document: ["create", "read", "update", "delete", "sign", "send", "download"],
	signature: ["create", "validate"],
	template: ["read", "use"],
	billing: ["view"],
	analytics: ["view-basic"],
});

/**
 * PLANO PROFESSIONAL (Intermediário)
 * - Usuários individuais com mais recursos
 * - Templates personalizados
 */
export const professional = ac.newRole({
	document: [
		"create",
		"read",
		"update",
		"delete",
		"sign",
		"send",
		"download",
		"duplicate",
		"archive",
	],
	template: ["create", "read", "update", "delete", "use"],
	analytics: ["view-basic", "view-advanced"],
	integration: ["read", "create", "update", "delete"],
});

/**
 * PLANO ENTERPRISE - ROLES ORGANIZACIONAIS
 */

// Membro básico da organização
export const member = ac.newRole({
	document: ["create", "read", "update", "sign", "send", "download"],
	signature: ["create", "validate"],
	template: ["read", "use"],
	workspace: ["read"],
	analytics: ["view-basic"],
});

// Colaborador avançado
export const collaborator = ac.newRole({
	document: [
		"create",
		"read",
		"update",
		"delete",
		"sign",
		"send",
		"download",
		"duplicate",
	],
	template: ["create", "read", "update", "delete", "use"],
	workspace: ["read", "create", "update"],
	analytics: ["view-basic", "view-advanced"],
});

// Gerente de equipe/departamento
export const manager = ac.newRole({
	...orgAdminAc.statements,
	document: [
		"create",
		"read",
		"update",
		"delete",
		"sign",
		"send",
		"download",
		"duplicate",
		"archive",
	],
	template: ["create", "read", "update", "delete", "use"],
	organization: ["read", "update", "invite", "manage-members"],
	workspace: ["create", "read", "update", "delete", "manage"],
	analytics: ["view-basic", "view-advanced", "export"],
	integration: ["create", "read", "update", "delete"],
	audit: ["read", "export"],
	billing: ["view"],
});

// Proprietário da organização (quem contratou o plano)
export const owner = ac.newRole({
	...manager.statements,
	document: [
		"create",
		"read",
		"update",
		"delete",
		"sign",
		"send",
		"download",
		"duplicate",
		"archive",
	],
	template: ["create", "read", "update", "delete", "use"],
	organization: [
		"create",
		"read",
		"update",
		"delete",
		"invite",
		"manage-members",
		"billing",
	],
	workspace: ["create", "read", "update", "delete", "manage"],
	analytics: ["view-basic", "view-advanced", "export"],
	integration: ["create", "read", "update", "delete"],
	audit: ["read", "export"],
	billing: ["view", "manage"],
});

/**
 * SUPER ADMIN (Você e sua equipe)
 * - Controle total do sistema
 * - Acesso a todas as organizações
 * - Ferramentas de administração do SaaS
 */
export const admin = ac.newRole({
	// Todas as permissões padrão do better-auth
	...adminAc.statements,

	// Todas as permissões customizadas
	document: [
		"create",
		"read",
		"update",
		"delete",
		"sign",
		"send",
		"download",
		"duplicate",
		"archive",
	],
	template: ["create", "read", "update", "delete", "use"],
	organization: [
		"create",
		"read",
		"update",
		"delete",
		"invite",
		"manage-members",
		"billing",
	],
	workspace: ["create", "read", "update", "delete", "manage"],
	analytics: ["view-basic", "view-advanced", "export"],
	integration: ["create", "read", "update", "delete"],
	audit: ["read", "export"],
	billing: ["view", "manage"],
	saas: [
		"manage-users",
		"manage-orgs",
		"manage-plans",
		"view-analytics",
		"manage-system",
	],
});

export const support = ac.newRole({
	user: ["list", "impersonate"], // Pode listar e personificar usuários para suporte
	document: ["read", "audit"],
	signature: ["validate"],
	template: ["read"],
	analytics: ["view-basic"],
	saas: ["view-analytics"], // Apenas visualização de analytics
});

/**
 * Mapeamento de planos para roles padrão
 */
export const planToDefaultRole = {
	community: "community",
	professional: "professional",
	enterprise: "member", // Role padrão para novos membros enterprise
} as const;

/**
 * Hierarquia de roles enterprise (do menor para o maior privilégio)
 */
export const enterpriseRoleHierarchy = [
	"member",
	"collaborator",
	"manager",
	"admin",
	"owner",
] as const;

export { ac };
