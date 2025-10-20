"use client";

import { useSessionContext } from "@/contexts/SessionProvider";

export default function Page() {
	const session = useSessionContext();

	return <pre>{session?.session}</pre>;
}
