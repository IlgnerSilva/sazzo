"use client";

import {
	AudioWaveform,
	Command,
	Frame,
	LifeBuoy,
	SquareTerminal,
} from "lucide-react";

import type * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import { UISidebar } from "@/components/ui";
import { useSessionContext } from "@/contexts/SessionProvider";

export function AppSidebar({
	...props
}: React.ComponentProps<typeof UISidebar.Sidebar>) {
	const dataSession = useSessionContext();
	if (!dataSession) {
		return null;
	}
	const data = {
		user: {
			name: dataSession.user.name,
			email: dataSession.user.email,
			avatar: dataSession.user.image || "",
		},
		teams: [
			{
				name: "Acme Inc",
				logo: Command,
				plan: "Enterprise",
			},
			{
				name: "Acme Corp.",
				logo: AudioWaveform,
				plan: "Startup",
			},
			{
				name: "Evil Corp.",
				logo: Command,
				plan: "Free",
			},
		],
		navMain: [
			{
				title: "Playground",
				url: "#",
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: "History",
						url: "#",
					},
					{
						title: "Starred",
						url: "#",
					},
					{
						title: "Settings",
						url: "#",
					},
				],
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoy,
			},
		],
		projects: [
			{
				name: "Design Engineering",
				url: "#",
				icon: Frame,
			},
		],
	};
	return (
		<UISidebar.Sidebar variant="inset" {...props}>
			<UISidebar.SidebarHeader>
				<TeamSwitcher teams={data.teams} />
			</UISidebar.SidebarHeader>
			<UISidebar.SidebarContent>
				<NavMain items={data.navMain} />
			</UISidebar.SidebarContent>
			<UISidebar.SidebarFooter>
				<NavUser user={data.user} />
			</UISidebar.SidebarFooter>
		</UISidebar.Sidebar>
	);
}
