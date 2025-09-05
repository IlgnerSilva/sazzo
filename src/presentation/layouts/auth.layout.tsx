import { SwitcherLocale } from "@/presentation/components/common";
import { AuthImage } from "@/presentation/components/feature/auth";

export function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="relative flex min-h-screen max-h-screen min-w-full max-w-full flex-col items-center justify-center bg-primary">
			<SwitcherLocale className="absolute top-4 left-4 bg-secondary" />
			<div className="flex min-h-screen w-full justify-center items-center gap-16 md:p-16">
				<div className="hidden md:block md:w-1/2">
					<AuthImage className="max-h-full w-full max-w-full" />
				</div>
				<div className="h-full w-full bg-primary-foreground py-2 md:w-1/2 md:rounded-sm">
					{children}
				</div>
			</div>
		</div>
	);
}
