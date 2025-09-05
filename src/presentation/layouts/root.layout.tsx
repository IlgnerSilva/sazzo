import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/lib/i18n/routing";

type Params = Promise<{ locale: string }>;

export const metadata: Metadata = {
	title: "Sazzo",
	description: "Sazzo Multi Idioma",
};

export async function RootLayout({
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
			<body>
				<NextIntlClientProvider messages={dictionary}>
					{children}
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
