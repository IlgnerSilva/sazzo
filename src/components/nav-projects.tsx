"use client";

import {
	Folder,
	type LucideIcon,
	MoreHorizontal,
	Share,
	Trash2,
} from "lucide-react";

import { UIDropdown, UISidebar } from "@/components/ui";

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
						<UIDropdown.DropdownMenu>
							<UIDropdown.DropdownMenuTrigger asChild>
								<UISidebar.SidebarMenuAction showOnHover>
									<MoreHorizontal />
									<span className="sr-only">More</span>
								</UISidebar.SidebarMenuAction>
							</UIDropdown.DropdownMenuTrigger>
							<UIDropdown.DropdownMenuContent
								align={isMobile ? "end" : "start"}
								className="w-48"
								side={isMobile ? "bottom" : "right"}
							>
								<UIDropdown.DropdownMenuItem>
									<Folder className="text-muted-foreground" />
									<span>View Project</span>
								</UIDropdown.DropdownMenuItem>
								<UIDropdown.DropdownMenuItem>
									<Share className="text-muted-foreground" />
									<span>Share Project</span>
								</UIDropdown.DropdownMenuItem>
								<UIDropdown.DropdownMenuSeparator />
								<UIDropdown.DropdownMenuItem>
									<Trash2 className="text-muted-foreground" />
									<span>Delete Project</span>
								</UIDropdown.DropdownMenuItem>
							</UIDropdown.DropdownMenuContent>
						</UIDropdown.DropdownMenu>
					</UISidebar.SidebarMenuItem>
				))}
				<UISidebar.SidebarMenuItem>
					<UISidebar.SidebarMenuButton>
						<MoreHorizontal />
						<span>More</span>
					</UISidebar.SidebarMenuButton>
				</UISidebar.SidebarMenuItem>
			</UISidebar.SidebarMenu>
		</UISidebar.SidebarGroup>
	);
}
