import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { pathnames as pathname } from "@/routes";

export const routing = defineRouting({
  // Lista de idiomas que serão suportados
  locales: ["en", "pt-br"],

  // Idioma padrão
  defaultLocale: "pt-br",

  // Caminhos para cada idioma
  pathnames: { ...pathname },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { locales, defaultLocale, pathnames } = routing;

// Cria as funções de navegação
// Link, redirect, usePathname, useRouter
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
