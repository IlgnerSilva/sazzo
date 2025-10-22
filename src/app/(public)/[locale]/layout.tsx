import { GalleryVerticalEnd } from "lucide-react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
					<div className="grid h-screen lg:grid-cols-2">
						<div className="flex flex-col gap-4 p-6">
							<div className="flex justify-center gap-2 md:justify-start">
								<Link className="flex items-center gap-2 font-medium" href="#">
									<div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
										<GalleryVerticalEnd className="size-4" />
									</div>
									Acme Inc.
								</Link>
							</div>
							{children}
						</div>
						<div className="relative hidden bg-muted lg:block">
							<Image
								alt="Image"
								className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
								height={10}
								src="/placeholder.svg"
								width={10}
							/>
						</div>
					</div>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
