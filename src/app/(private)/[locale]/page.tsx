"use client";

import { useSessionContext } from "@/contexts/SessionProvider";

export default function Page() {
	const data = useSessionContext();
	return <div></div>;
}
