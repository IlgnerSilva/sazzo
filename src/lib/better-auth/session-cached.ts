import { unstable_cache } from "next/cache";
import { headers } from "next/headers";
import { auth } from "./auth";

async function fetchSession(headerList: Headers) {
	return await auth.api.getSession({ headers: headerList });
}

export const getCachedSession = async () => {
	const headerList = await headers(); // ✅ capturado fora
	const getCached = unstable_cache(
		async (headerList: Headers) => await fetchSession(headerList),
		["session"],
		{ revalidate: 60 },
	);
	return getCached(headerList); // ✅ passa headers como argumento
};
