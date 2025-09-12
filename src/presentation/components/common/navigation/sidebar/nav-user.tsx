"use client";

import {
	AppWindow,
	BrickWallIcon,
	Building,
	ChevronsUpDown,
	Key,
	LogOut,
	ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
	UIAvatar,
	UIDropdownMenu,
	UISidebar,
} from "@/presentation/components/ui";

export function NavUser({
	user,
}: {
	user?: {
		name: string;
		email: string;
		avatar: string | React.ReactElement;
	};
}) {
	const { isMobile } = UISidebar.useSidebar();
	const t = useTranslations();
	if (!user) return null;
	return (
		<UISidebar.SidebarMenu>
			<UISidebar.SidebarMenuItem>
				<UIDropdownMenu.DropdownMenu>
					<UIDropdownMenu.DropdownMenuTrigger asChild>
						<UISidebar.SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<UIAvatar.Avatar className="h-8 w-8 rounded-lg">
								{typeof user.avatar === "string" ? (
									<>
										<UIAvatar.AvatarImage src={user.avatar} alt={user.name} />
										<UIAvatar.AvatarFallback className="rounded-lg">
											CN
										</UIAvatar.AvatarFallback>
									</>
								) : (
									<UIAvatar.AvatarFallback className="rounded-lg">
										{user.avatar}
									</UIAvatar.AvatarFallback>
								)}
							</UIAvatar.Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</UISidebar.SidebarMenuButton>
					</UIDropdownMenu.DropdownMenuTrigger>
					<UIDropdownMenu.DropdownMenuContent
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<UIDropdownMenu.DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<UIAvatar.Avatar className="h-8 w-8 rounded-lg">
									{typeof user.avatar === "string" ? (
										<>
											<UIAvatar.AvatarImage src={user.avatar} alt={user.name} />
											<UIAvatar.AvatarFallback className="rounded-lg">
												CN
											</UIAvatar.AvatarFallback>
										</>
									) : (
										<UIAvatar.AvatarFallback className="rounded-lg">
											{user.avatar}
										</UIAvatar.AvatarFallback>
									)}
								</UIAvatar.Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</UIDropdownMenu.DropdownMenuLabel>
						<UIDropdownMenu.DropdownMenuSeparator />
						{/* <UIDropdownMenu.DropdownMenuGroup>
							<UIDropdownMenu.DropdownMenuItem>
								<Sparkles />
								{t("components.NavUser.Links.profile")}
							</UIDropdownMenu.DropdownMenuItem>
						</UIDropdownMenu.DropdownMenuGroup> */}
						<UIDropdownMenu.DropdownMenuSeparator />
						<UIDropdownMenu.DropdownMenuGroup>
							<Link href="/account">
								<UIDropdownMenu.DropdownMenuItem className="cursor-pointer">
									<AppWindow />
									{t("components.NavUser.Links.account")}
								</UIDropdownMenu.DropdownMenuItem>
							</Link>
							<Link href="#">
								<UIDropdownMenu.DropdownMenuItem className="cursor-pointer">
									<Building />
									{t("components.NavUser.Links.organizations")}
								</UIDropdownMenu.DropdownMenuItem>
							</Link>
							<Link href="#">
								<UIDropdownMenu.DropdownMenuItem className="cursor-pointer">
									<ShieldCheck />
									{t("components.NavUser.Links.security")}
								</UIDropdownMenu.DropdownMenuItem>
							</Link>
							<Link href="/admin">
								<UIDropdownMenu.DropdownMenuItem className="cursor-pointer">
									<BrickWallIcon />
									{t("components.NavUser.Links.admin")}
								</UIDropdownMenu.DropdownMenuItem>
							</Link>
						</UIDropdownMenu.DropdownMenuGroup>
						<UIDropdownMenu.DropdownMenuSeparator />
						<UIDropdownMenu.DropdownMenuItem className="cursor-pointer">
							<LogOut />
							{t("components.NavUser.Links.logout")}
						</UIDropdownMenu.DropdownMenuItem>
					</UIDropdownMenu.DropdownMenuContent>
				</UIDropdownMenu.DropdownMenu>
			</UISidebar.SidebarMenuItem>
		</UISidebar.SidebarMenu>
	);
}
