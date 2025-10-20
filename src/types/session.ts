export type Session = {
	session: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		userId: string;
		expiresAt: Date;
		token: string;
		ipAddress?: string | null;
		userAgent?: string | null;
		impersonatedBy?: string | null;
		activeOrganizationId?: string | null;
	};
	user: {
		id: string;
		createdAt: Date;
		updatedAt: Date;
		email: string;
		emailVerified: boolean;
		name: string;
		image?: string | null;
		twoFactorEnabled?: boolean | null;
		username?: string | null;
		displayUsername?: string | null;
		banned?: boolean | null;
		role?: string | null;
		banReason?: string | null;
		banExpires?: Date | null;
	};
} | null;
