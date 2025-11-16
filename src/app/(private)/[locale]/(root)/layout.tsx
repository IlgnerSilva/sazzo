import { AppSidebar } from "@/components/app-sidebar";
import { AutoBreadcrumb } from "@/components/auto-breadcrumb";
import { UIBreadcrumb, UISeparator, UISidebar } from "@/components/ui";

export default async function LocaleLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<UISidebar.SidebarProvider>
			<AppSidebar />
			<UISidebar.SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2">
					<div className="flex items-center gap-2 px-4">
						<UISidebar.SidebarTrigger className="-ml-1" />
						<UISeparator.Separator
							className="mr-2 data-[orientation=vertical]:h-4"
							orientation="vertical"
						/>
						<AutoBreadcrumb />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
					{/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
				</div>
			</UISidebar.SidebarInset>
		</UISidebar.SidebarProvider>
	);
}
