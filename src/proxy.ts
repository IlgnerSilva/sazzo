import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getCachedSession } from "@/lib/better-auth/session-cached";
import { locales, routing } from "@/lib/i18n/routing";
import { privateRoutes, publicRoutes } from "@/routes";

// ✅ Middleware de internacionalização
const intlMiddleware = createMiddleware(routing);

// ✅ PRÉ-COMPILAR regexes para performance
const localesPattern = locales.join("|");

// Cache de regexes compilados
const routeMatchers = {
	public: null as RegExp | null,
	private: null as RegExp | null,
};

// ✅ Função otimizada para criar regex de rotas
function createRouteRegex(pages: string[]): RegExp {
	const pathsWithParams = pages.map((p) => p.replace(/\[.*?\]/g, "[^/]+"));
	return new RegExp(
		`^(/(${localesPattern}))?(${pathsWithParams.flatMap((p) => (p === "/" ? ["", "/"] : p)).join("|")})/?$`,
		"i",
	);
}

// ✅ Inicializar regexes uma vez
function initRouteMatchers() {
	if (!routeMatchers.public) {
		routeMatchers.public = createRouteRegex(publicRoutes);
	}
	if (!routeMatchers.private) {
		routeMatchers.private = createRouteRegex(privateRoutes);
	}
}

// ✅ Teste otimizado de pathname
function testPathnameRegex(regex: RegExp, pathName: string): boolean {
	return regex.test(pathName);
}

// ✅ Middleware de autenticação otimizado
const authMiddleware = async (req: NextRequest) => {
	// Inicializar matchers se necessário
	initRouteMatchers();

	const pathname = req.nextUrl.pathname;

	// ✅ Early return para assets e API routes (não precisam de auth check)
	if (
		pathname.startsWith("/_next") ||
		pathname.startsWith("/api") ||
		pathname.includes(".")
	) {
		return intlMiddleware(req);
	}

	const isPublicPage = testPathnameRegex(routeMatchers.public!, pathname);
	const isProtectPage = testPathnameRegex(routeMatchers.private!, pathname);

	// ✅ Só busca sessão se necessário (páginas protegidas ou públicas com redirecionamento)
	let session = null;
	if (isProtectPage || isPublicPage) {
		session = await getCachedSession();
	}

	const isLogged = !!session;

	// ✅ Redirecionar para login se não autenticado em página protegida
	if (!isLogged && isProtectPage) {
		const url = new URL("/auth/signin", req.nextUrl.origin);
		// ✅ Preservar locale na URL de redirecionamento
		const locale = pathname.split("/")[1];
		if (locales.includes(locale as any)) {
			url.pathname = `/${locale}/auth/signin`;
		}
		return NextResponse.redirect(url);
	}

	// ✅ Redirecionar para home se autenticado tentando acessar página pública
	if (isLogged && isPublicPage) {
		const url = new URL("/", req.nextUrl.origin);
		// ✅ Preservar locale
		const locale = pathname.split("/")[1];
		if (locales.includes(locale as any)) {
			url.pathname = `/${locale}`;
		}
		return NextResponse.redirect(url);
	}

	// ✅ Continuar com internacionalização
	return intlMiddleware(req);
};

// ✅ Função principal
const proxy = (req: NextRequest) => {
	return authMiddleware(req);
};

// ✅ Matcher otimizado - exclui arquivos estáticos explicitamente
export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 * - *.* (files with extensions)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
	],
};

export default proxy;
