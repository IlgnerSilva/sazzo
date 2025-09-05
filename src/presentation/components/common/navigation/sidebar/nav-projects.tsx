"use client";

import {
	Folder,
	Forward,
	type LucideIcon,
	MoreHorizontal,
	Trash2,
} from "lucide-react";

import { UIDropdownMenu, UISidebar } from "@/presentation/components/ui";

export function NavProjects({
	projects,
}: {
	projects: {
		name: string;
		url: string;
		icon: LucideIcon;
	}[];
}) {
	const { isMobile } = UISidebar.useSidebar();

	return (
		<UISidebar.SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<UISidebar.SidebarGroupLabel>Projects</UISidebar.SidebarGroupLabel>
			<UISidebar.SidebarMenu>
				{projects.map((item) => (
					<UISidebar.SidebarMenuItem key={item.name}>
						<UISidebar.SidebarMenuButton asChild>
							<a href={item.url}>
								<item.icon />
								<span>{item.name}</span>
							</a>
						</UISidebar.SidebarMenuButton>
						<UIDropdownMenu.DropdownMenu>
							<UIDropdownMenu.DropdownMenuTrigger asChild>
								<UISidebar.SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</UISidebar.SidebarMenuAction>
							</UIDropdownMenu.DropdownMenuTrigger>
							<UIDropdownMenu.DropdownMenuContent
								className="w-48 rounded-lg"
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}
							>
								<UIDropdownMenu.DropdownMenuItem>
									<Folder className="text-muted-foreground" />
									<span>View Project</span>
								</UIDropdownMenu.DropdownMenuItem>
								<UIDropdownMenu.DropdownMenuItem>
									<Forward className="text-muted-foreground" />
									<span>Share Project</span>
								</UIDropdownMenu.DropdownMenuItem>
								<UIDropdownMenu.DropdownMenuSeparator />
								<UIDropdownMenu.DropdownMenuItem>
									<Trash2 className="text-muted-foreground" />
									<span>Delete Project</span>
								</UIDropdownMenu.DropdownMenuItem>
							</UIDropdownMenu.DropdownMenuContent>
						</UIDropdownMenu.DropdownMenu>
					</UISidebar.SidebarMenuItem>
				))}
				<UISidebar.SidebarMenuItem>
					<UISidebar.SidebarMenuButton className="text-sidebar-foreground/70">
						<MoreHorizontal className="text-sidebar-foreground/70" />
						<span>More</span>
					</UISidebar.SidebarMenuButton>
				</UISidebar.SidebarMenuItem>
			</UISidebar.SidebarMenu>
		</UISidebar.SidebarGroup>
	);
}
