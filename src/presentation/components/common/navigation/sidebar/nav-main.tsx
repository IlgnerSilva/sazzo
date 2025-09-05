"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UICollapsible, UISidebar } from "@/presentation/components/ui";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter(Boolean);
	return (
		<UISidebar.SidebarGroup>
			<UISidebar.SidebarGroupLabel>Platform</UISidebar.SidebarGroupLabel>
			<UISidebar.SidebarMenu>
				{items.map((item) => (
					<UICollapsible.Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<UISidebar.SidebarMenuItem>
							<UICollapsible.CollapsibleTrigger
								className="cursor-pointer"
								asChild
							>
								<UISidebar.SidebarMenuButton
									className={item.isActive ? "text-sidebar-primary" : ""}
									tooltip={item.title}
								>
									{item.icon && <item.icon />}
									<span>{item.title}</span>
									<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
								</UISidebar.SidebarMenuButton>
							</UICollapsible.CollapsibleTrigger>
							<UICollapsible.CollapsibleContent>
								<UISidebar.SidebarMenuSub>
									{item.items?.map((subItem) => (
										<UISidebar.SidebarMenuSubItem key={subItem.title}>
											<UISidebar.SidebarMenuSubButton
												className={
													pathSegments.find(
														(pathSegments) =>
															pathSegments === subItem.url.split("/").pop(),
													)
														? "bg-sidebar-accent text-sidebar-primary"
														: ""
												}
												asChild
											>
												<Link href={subItem.url}>
													<span>{subItem.title}</span>
												</Link>
											</UISidebar.SidebarMenuSubButton>
										</UISidebar.SidebarMenuSubItem>
									))}
								</UISidebar.SidebarMenuSub>
							</UICollapsible.CollapsibleContent>
						</UISidebar.SidebarMenuItem>
					</UICollapsible.Collapsible>
				))}
			</UISidebar.SidebarMenu>
		</UISidebar.SidebarGroup>
	);
}
