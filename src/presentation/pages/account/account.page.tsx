import { UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button, TabsDemo } from "@/presentation/components/common";
import { FormEnabledTwoFactor } from "@/presentation/components/feature/auth";
import { UIAlertDialog } from "@/presentation/components/ui";
import { TabsContent, TabsTrigger } from "@/presentation/components/ui/tabs";
import { getSessionWithAutenticaded } from "@/server/dal/getSessionWithAutenticaded";

export async function AccountPage() {
	const session = await getSessionWithAutenticaded();
	console.log(session)
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
							<UIAlertDialog.AlertDialog>
								<UIAlertDialog.AlertDialogTrigger asChild>
									<Button variant="default">Show Dialog</Button>
								</UIAlertDialog.AlertDialogTrigger>
								<UIAlertDialog.AlertDialogContent>
									<UIAlertDialog.AlertDialogDescription>
										<FormEnabledTwoFactor />
									</UIAlertDialog.AlertDialogDescription>
								<UIAlertDialog.AlertDialogFooter>
									<UIAlertDialog.AlertDialogCancel>
										<Button variant="secondary">Close</Button>
									</UIAlertDialog.AlertDialogCancel>
								</UIAlertDialog.AlertDialogFooter>
								</UIAlertDialog.AlertDialogContent>
							</UIAlertDialog.AlertDialog>
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
