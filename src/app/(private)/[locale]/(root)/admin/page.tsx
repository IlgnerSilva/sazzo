import { getCachedSession } from "@/lib/better-auth/session-cached"

export default async function Page() {
	const session = await getCachedSession()
	return <pre>Admin</pre>;
}
