import { UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { TabsDemo } from "@/presentation/components/common";
import { TabSecurity } from "@/presentation/components/feature/security";
import { TabsContent, TabsTrigger } from "@/presentation/components/ui/tabs";

export async function AccountPage() {
	const t = await getTranslations("components.NavUser.Tabs");
	return (
		<div className="w-full h-full">
			<TabsDemo
				tabTriggers={
					<>
						<TabsTrigger value="profile">
							<UserRound /> {t("profile")}
						</TabsTrigger>
						<TabsTrigger value="security">
							<UserRound /> {t("security")}
						</TabsTrigger>
						<TabsTrigger value="settings">
							<UserRound /> {t("settings")}
						</TabsTrigger>
					</>
				}
				tabContents={
					<>
						<TabsContent value="profile">Content for Profile</TabsContent>
						<TabsContent value="security">
							<TabSecurity />
						</TabsContent>
						<TabsContent value="settings">
							Content for Notifications
						</TabsContent>
					</>
				}
			/>
		</div>
	);
}
