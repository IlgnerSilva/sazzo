"use client";
import { createContext, type ReactNode, useContext } from "react";
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
	return (
		<SessionContext.Provider value={initialSession}>
			{children}
		</SessionContext.Provider>
	);
}

export const useSessionContext = () => useContext(SessionContext);
