"use client";

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	Sparkles,
	User2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { UIDropdown, UISidebar } from "@/components/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/better-auth/auth-client";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar: string | null;
	};
}) {
	const { isMobile } = UISidebar.useSidebar();
	const router = useRouter();
	const c = useTranslations("components");

	async function handleLogOut() {
		return await authClient.signOut(
			{},
			{
				onSuccess: () => {
					router.push("/auth/signin");
				},
			},
		);
	}

	return (
		<UISidebar.SidebarMenu>
			<UISidebar.SidebarMenuItem>
				<UIDropdown.DropdownMenu>
					<UIDropdown.DropdownMenuTrigger asChild>
						<UISidebar.SidebarMenuButton
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							size="lg"
						>
							<Avatar className="h-8 w-8 rounded-lg">
								{!user.avatar ? (
									<AvatarFallback className="rounded-lg">
										<User2 />
									</AvatarFallback>
								) : (
									<AvatarFallback className="rounded-lg">
										<AvatarImage alt={user.name} src={user.avatar} />
									</AvatarFallback>
								)}
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{user.name}</span>
								<span className="truncate text-xs">{user.email}</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</UISidebar.SidebarMenuButton>
					</UIDropdown.DropdownMenuTrigger>
					<UIDropdown.DropdownMenuContent
						align="end"
						className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<UIDropdown.DropdownMenuLabel className="p-0 font-normal">
							<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
								<Avatar className="h-8 w-8 rounded-lg">
									{!user.avatar ? (
										<AvatarFallback className="rounded-lg">
											<User2 />
										</AvatarFallback>
									) : (
										<AvatarFallback className="rounded-lg">
											<AvatarImage alt={user.name} src={user.avatar} />
										</AvatarFallback>
									)}
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">{user.name}</span>
									<span className="truncate text-xs">{user.email}</span>
								</div>
							</div>
						</UIDropdown.DropdownMenuLabel>
						<UIDropdown.DropdownMenuSeparator />
						<UIDropdown.DropdownMenuGroup>
							<UIDropdown.DropdownMenuItem>
								<Sparkles />
								Upgrade to Pro
							</UIDropdown.DropdownMenuItem>
						</UIDropdown.DropdownMenuGroup>
						<UIDropdown.DropdownMenuSeparator />
						<UIDropdown.DropdownMenuGroup>
							<UIDropdown.DropdownMenuItem>
								<BadgeCheck />
								Account
							</UIDropdown.DropdownMenuItem>
							<UIDropdown.DropdownMenuItem>
								<CreditCard />
								Billing
							</UIDropdown.DropdownMenuItem>
							<UIDropdown.DropdownMenuItem>
								<Bell />
								Notifications
							</UIDropdown.DropdownMenuItem>
						</UIDropdown.DropdownMenuGroup>
						<UIDropdown.DropdownMenuSeparator />
						<UIDropdown.DropdownMenuItem
							className="cursor-pointer"
							onClick={handleLogOut}
						>
							<LogOut />
							{c("NavUser.Links.logout")}
						</UIDropdown.DropdownMenuItem>
					</UIDropdown.DropdownMenuContent>
				</UIDropdown.DropdownMenu>
			</UISidebar.SidebarMenuItem>
		</UISidebar.SidebarMenu>
	);
}
