"use client";

import { ChevronDown, Plus } from "lucide-react";
import * as React from "react";
import { UIDropdown, UISidebar } from "@/components/ui";

export function TeamSwitcher({
	teams,
}: {
	teams: {
		name: string;
		logo: React.ElementType;
		plan: string;
	}[];
}) {
	const [activeTeam, setActiveTeam] = React.useState(teams[0]);

	if (!activeTeam) {
		return null;
	}

	return (
		<UISidebar.SidebarMenu>
			<UISidebar.SidebarMenuItem>
				<UIDropdown.DropdownMenu>
					<UIDropdown.DropdownMenuTrigger asChild>
						<UISidebar.SidebarMenuButton className="w-fit px-1.5">
							<div className="flex aspect-square size-5 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
								<activeTeam.logo className="size-3" />
							</div>
							<span className="truncate font-medium">{activeTeam.name}</span>
							<ChevronDown className="opacity-50" />
						</UISidebar.SidebarMenuButton>
					</UIDropdown.DropdownMenuTrigger>
					<UIDropdown.DropdownMenuContent
						align="start"
						className="w-64 rounded-lg"
						side="bottom"
						sideOffset={4}
					>
						<UIDropdown.DropdownMenuLabel className="text-muted-foreground text-xs">
							Teams
						</UIDropdown.DropdownMenuLabel>
						{teams.map((team, index) => (
							<UIDropdown.DropdownMenuItem
								className="gap-2 p-2"
								key={team.name}
								onClick={() => setActiveTeam(team)}
							>
								<div className="flex size-6 items-center justify-center rounded-xs border">
									<team.logo className="size-4 shrink-0" />
								</div>
								{team.name}
								<UIDropdown.DropdownMenuShortcut>
									⌘{index + 1}
								</UIDropdown.DropdownMenuShortcut>
							</UIDropdown.DropdownMenuItem>
						))}
						<UIDropdown.DropdownMenuSeparator />
						<UIDropdown.DropdownMenuItem className="gap-2 p-2">
							<div className="flex size-6 items-center justify-center rounded-md border bg-background">
								<Plus className="size-4" />
							</div>
							<div className="font-medium text-muted-foreground">Add team</div>
						</UIDropdown.DropdownMenuItem>
					</UIDropdown.DropdownMenuContent>
				</UIDropdown.DropdownMenu>
			</UISidebar.SidebarMenuItem>
		</UISidebar.SidebarMenu>
	);
}
