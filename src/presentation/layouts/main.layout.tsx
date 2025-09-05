import {
	AppSidebar,
	AutoBreadcrumb,
	SwitcherLocale,
} from "@/presentation/components/common";
import { UISeparator, UISidebar } from "@/presentation/components/ui";
import { getSessionWithAutenticaded } from "@/server/dal/getSessionWithAutenticaded";

export async function MainLayout({ children }: { children: React.ReactNode }) {
	const session = await getSessionWithAutenticaded();
	return (
		<>
			<SwitcherLocale className="absolute top-4 right-4 bg-secondary z-10" />
			<UISidebar.SidebarProvider>
				<AppSidebar props={{}} sessionData={session} />
				<UISidebar.SidebarInset>
					<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
						<div className="flex items-center gap-2 px-4">
							<UISidebar.SidebarTrigger className="-ml-1" />
							<UISeparator.Separator
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
				</UISidebar.SidebarInset>
			</UISidebar.SidebarProvider>
		</>
	);
}
