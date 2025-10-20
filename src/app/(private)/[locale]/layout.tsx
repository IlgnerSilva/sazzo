import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
	title: "Templete - Login",
	description: "Template Multi Idioma",
};

export default async function LocaleLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Params;
}) {
	const { locale } = await params;
	if (!routing.locales.includes(locale as any)) {
		notFound();
	}
	const dictionary = await getMessages();
	return (
		<html lang={locale}>
			<body
				className={`${geistSans.variable} ${geistMono.variable} max-h-screen min-h-screen antialiased`}
			>
				<NextIntlClientProvider messages={dictionary}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
