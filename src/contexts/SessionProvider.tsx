"use client";
import { createContext, type ReactNode, useContext } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import type { Session } from "@/types/session";

type SessionProviderProps = {
	children: ReactNode;
	initialSession: Session;
};

const SessionContext = createContext<Session>(null);

export function SessionProvider({
	children,
	initialSession,
}: SessionProviderProps) {
	const { data: clientSession } = authClient.useSession();
	const session = clientSession || initialSession;

	return (
		<SessionContext.Provider value={session}>
			{children}
		</SessionContext.Provider>
	);
}

export const useSessionContext = () => useContext(SessionContext);
