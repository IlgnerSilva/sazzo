import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { locales, routing } from "./lib/i18n/routing";
import { privateRoutes, publicRoutes } from "@/routes";
import { getCookieCache, getCookies } from "better-auth/cookies";

// Middleware responsável pela internacionalização das rotas
const intlMiddleware = createMiddleware(routing);

// Função que testa se o caminho da URL corresponde a uma das rotas definidas
const testPathnameRegex = (pages: string[], pathName: string): boolean => {
	const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, "[^/]+"));
	return RegExp(
		`^(/(${locales.join("|")}))?(${pathsWithParams.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
		"i", // flag "i" para ignorar maiúsculas/minúsculas
	).test(pathName);
};

// Middleware de autenticação usando NextAuth
const authMiddleware = async (req: NextRequest) => {
	const isPublicPage = testPathnameRegex(publicRoutes, req.nextUrl.pathname);
	const isProtectPage = testPathnameRegex(privateRoutes, req.nextUrl.pathname);

	//console.log(req.cookies);
	const session = await getCookieCache(req, {
		cookiePrefix: process.env.APP_NAME,
		isSecure: process.env.NODE_ENV === "production",
		secret: process.env.BETTER_AUTH_SECRET,
	});

	const isLogged = !!session;

	// Se o usuário não estiver autenticado e tentar acessar uma página que requer autenticação, redireciona para a página de login
	if (!isLogged && isProtectPage) {
		// Se já estiver tentando acessar a página de login, não redireciona
		if (req.nextUrl.pathname === "/auth/signin") {
			return NextResponse.next(); // Deixa o usuário continuar na página de login
		}
		return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
	}

	// Se o usuário estiver autenticado e tentar acessar uma página de login, redireciona para a página inicial
	if (isLogged && isPublicPage) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}

	// Se não for uma página de autenticação, continua o processo de internacionalização
	return intlMiddleware(req);
};

// Função principal do middleware que combina a autenticação e a internacionalização
const middleware = (req: NextRequest) => {
	return (authMiddleware as any)(req);
};

// Configuração de correspondência para os caminhos que o middleware deve interceptar
export const config = {
	matcher: ["/((?!api|doc|rpc|spec|_next|_vercel|.*\\..*).*)"],
};

export default middleware;
