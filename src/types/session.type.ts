export interface Session {
	id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    token: string;
    ipAddress?: string | null | undefined | undefined;
    userAgent?: string | null | undefined | undefined;
	impersonatedBy?: string | null | undefined | undefined;
	activeOrganizationId?: string | null | undefined | undefined;

	
}

export type UserRole =
	| "community"
	| "professional"
	| "member"
	| "collaborator"
	| "manager"
	| "admin"
	| "owner"
	| "superadmin";

export interface User {
	name: string;
	email: string;
	emailVerified: boolean;
	image?: string | null;
	createdAt?: Date | null | undefined;
	updatedAt?: Date | null | undefined;
	role?: string | null | undefined | undefined;
	banned?: boolean | null | undefined | undefined;
	banReason?: string | null | undefined | undefined;
	banExpires?: Date | null | undefined;
	username?: string | null | undefined | undefined;
	displayUsername?: string | null | undefined | undefined;
	twoFactorEnabled: boolean | null | undefined;
	id: string;
}

export interface AuthData {
	session: Session;
	user: User;
}

export type UserPlan = "community" | "professional" | "enterprise";
