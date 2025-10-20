import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import { UISidebar } from "@/components/ui";

export function NavSecondary({
	items,
	...props
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
	}[];
} & React.ComponentPropsWithoutRef<typeof UISidebar.SidebarGroup>) {
	return (
		<UISidebar.SidebarGroup {...props}>
			<UISidebar.SidebarGroupContent>
				<UISidebar.SidebarMenu>
					{items.map((item) => (
						<UISidebar.SidebarMenuItem key={item.title}>
							<UISidebar.SidebarMenuButton asChild size="sm">
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</UISidebar.SidebarMenuButton>
						</UISidebar.SidebarMenuItem>
					))}
				</UISidebar.SidebarMenu>
			</UISidebar.SidebarGroupContent>
		</UISidebar.SidebarGroup>
	);
}
