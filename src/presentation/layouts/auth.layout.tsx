import { AuthIcon } from "@/presentation/components/icons/auth.icon";
import { SwitcherLocale } from "@/presentation/components/switcher-locale";

export function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex min-h-screen min-w-screen max-w-full flex-col items-center justify-center bg-primary">
			<SwitcherLocale className="absolute top-4 right-4 bg-secondary" />
			<div className="flex h-screen w-full justify-center gap-16 md:p-16">
				<div className="hidden md:block md:w-1/2">
					<AuthIcon className="max-h-full w-full max-w-full" />
				</div>
				<div className="h-full w-full bg-primary-foreground md:w-1/2 md:rounded-sm">
					{children}
				</div>
			</div>
		</div>
	);
}
