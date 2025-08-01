export interface Session {
	expiresAt: string; // ou Date se for convertido
	token: string;
	createdAt: string; // ou Date
	updatedAt: string; // ou Date
	ipAddress: string;
	userAgent: string;
	userId: string;
	impersonatedBy: string | null;
	id: string;
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
	image: string | null;
	createdAt: string;
	updatedAt: string;
	role: UserRole;
	banned: boolean | null;
	banReason: string | null;
	banExpires: string | null;
	username: string | null;
	displayUsername: string | null;
	twoFactorEnabled: boolean | null;
	id: string;
}

export interface AuthData {
	session: Session;
	user: User;
}

export type UserPlan = "community" | "professional" | "enterprise";
