import { headers } from "next/headers";
import { auth } from "./auth";

// Função interna cacheada que recebe os headers como argumento
async function fetchSessionCached(headersList: Headers) {
	"use cache";
	return await auth.api.getSession({ headers: headersList });
}

// Função externa que obtém os headers e chama a função cacheada
export const getCachedSession = async () => {
	const headersList = await headers();
	const session = await fetchSessionCached(headersList);
	return session;
};
