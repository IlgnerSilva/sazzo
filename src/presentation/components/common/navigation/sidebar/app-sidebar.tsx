"use client";

import { ShieldUser, User2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type * as React from "react";
import type { Auth } from "@/core/domain/entities/auth.entity";
import type { Organization } from "@/core/domain/entities/organization.entity";
import {
	NavMain,
	NavUser,
	TeamSwitcher,
} from "@/presentation/components/common";
import { UISidebar } from "@/presentation/components/ui";

export function AppSidebar({
	props,
	sessionData,
	organizationsData,
}: {
	props: React.ComponentProps<typeof UISidebar.Sidebar>;
	sessionData?: Auth;
	organizationsData?: Organization[];
}) {
	const pathnameTranslation = useTranslations("common.pathname");
	const pathname = usePathname();
	const pathSegments = pathname.split("/").filter(Boolean);
	const data = {
		user: {
			name: sessionData?.user?.name,
			email: sessionData?.user?.email,
			avatar: sessionData?.user?.image || <User2 />,
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
		<UISidebar.Sidebar collapsible="icon" {...props}>
			<UISidebar.SidebarHeader>
				<TeamSwitcher data={organizationsData} />
			</UISidebar.SidebarHeader>
			<UISidebar.SidebarContent>
				<NavMain items={data.navMain} />
			</UISidebar.SidebarContent>
			<UISidebar.SidebarFooter>
				<NavUser user={data.user} />
			</UISidebar.SidebarFooter>
			<UISidebar.SidebarRail />
		</UISidebar.Sidebar>
	);
}
