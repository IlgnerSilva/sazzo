"use client";

import * as React from "react";
import {
	AudioWaveform,
	Command,
	GalleryVerticalEnd,
	User2,
	ShieldUser,
} from "lucide-react";

import { NavMain } from "@/presentation/components/nav-main";
import { NavUser } from "@/presentation/components/nav-user";
import { TeamSwitcher } from "@/presentation/components/team-switcher";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/presentation/components/ui/sidebar";
import { AuthData } from "@/types/session.type";
import { Organization } from "@/types/organizations.type";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

export function AppSidebar({
	props,
	sessionData,
	organizationsData,
}: {
	props: React.ComponentProps<typeof Sidebar>;
	sessionData: AuthData;
	organizationsData: Organization[];
}) {
	const { user } = sessionData;
	const pathnameTranslation = useTranslations("common.pathname");
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter(Boolean);
	const data = {
		user: {
			name: user?.name,
			email: user?.email,
			avatar: user?.image || <User2 />,
		},

		navMain: [
			{
				title: pathnameTranslation("admin.root"),
				url: "#",
				icon: ShieldUser,
				isActive: !!pathSegments.find((segment) => segment === "admin"),
				items: [
					{
						title: pathnameTranslation("admin.overview"),
						url: "/admin",
					},
				],
			},
		],
	};
	//const { data: authData, error } = await authClient.organization.list();

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher data={organizationsData} />
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
