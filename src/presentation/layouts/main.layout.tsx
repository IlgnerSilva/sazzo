import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import { AppSidebar } from "@/presentation/components/app-sidebar";
import { AutoBreadcrumb } from "@/presentation/components/auto-breadcrumb";
import { Separator } from "@/presentation/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/presentation/components/ui/sidebar";
import { getSession } from "@/server/data/session";

export async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await getSession();

	const orgs = await auth.api.listOrganizations({
		headers: await headers(),
	});
	return (
		<SidebarProvider>
			<AppSidebar props={{}} organizationsData={orgs} sessionData={session} />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger className="-ml-1" />
						<Separator
							orientation="vertical"
							className="mr-2 data-[orientation=vertical]:h-4"
						/>
						<AutoBreadcrumb />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 p-2 md:min-h-min">
						{children}
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
