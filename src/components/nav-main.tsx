"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import { UICollapsible, UISidebar } from "@/components/ui";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	return (
		<UISidebar.SidebarGroup>
			<UISidebar.SidebarGroupLabel>Platform</UISidebar.SidebarGroupLabel>
			<UISidebar.SidebarMenu>
				{items.map((item) => (
					<UICollapsible.Collapsible
						asChild
						defaultOpen={item.isActive}
						key={item.title}
					>
						<UISidebar.SidebarMenuItem>
							<UISidebar.SidebarMenuButton asChild tooltip={item.title}>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</UISidebar.SidebarMenuButton>
							{item.items?.length ? (
								<>
									<UICollapsible.CollapsibleTrigger asChild>
										<UISidebar.SidebarMenuAction className="data-[state=open]:rotate-90">
											<ChevronRight />
											<span className="sr-only">Toggle</span>
										</UISidebar.SidebarMenuAction>
									</UICollapsible.CollapsibleTrigger>
									<UICollapsible.CollapsibleContent>
										<UISidebar.SidebarMenuSub>
											{item.items?.map((subItem) => (
												<UISidebar.SidebarMenuSubItem key={subItem.title}>
													<UISidebar.SidebarMenuSubButton asChild>
														<a href={subItem.url}>
															<span>{subItem.title}</span>
														</a>
													</UISidebar.SidebarMenuSubButton>
												</UISidebar.SidebarMenuSubItem>
											))}
										</UISidebar.SidebarMenuSub>
									</UICollapsible.CollapsibleContent>
								</>
							) : null}
						</UISidebar.SidebarMenuItem>
					</UICollapsible.Collapsible>
				))}
			</UISidebar.SidebarMenu>
		</UISidebar.SidebarGroup>
	);
}
