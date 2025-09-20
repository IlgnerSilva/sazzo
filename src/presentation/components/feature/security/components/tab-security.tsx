import { Key, ShieldCheck, Smartphone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/presentation/components/common";
import { UIAlertDialog, UIStatus, UITabs } from "@/presentation/components/ui";
import { getSessionWithAutenticaded } from "@/server/dal/getSessionWithAutenticaded";
import { FormEnabledTwoFactor } from "./form-enablad-two-factor";

export async function TabSecurity() {
	const t = await getTranslations("components.TabSecurity");
	const session = await getSessionWithAutenticaded();
	return (
		<div className="flex flex-col gap-4">
			<div>
				<h2 className="text-xl font-bold">{t("title")}</h2>
				<p>{t("subtitle")}</p>
			</div>
			<section className="flex flex-col gap-4">
				<div>
					<div className="flex items-center gap-2">
						<ShieldCheck />
						<h3 className="text-xl font-bold">Two-Factor Authentication</h3>
					</div>
					<p>Add an extra layer of security to your account with 2FA.</p>
				</div>
				<div>
					<div className="flex items-center justify-between gap-2 bg-accent/20 p-2 rounded-lg">
						<div className="flex items-center gap-2">
							<span className="bg-primary/10 p-2 rounded-lg">
								<Smartphone className="text-primary" />
							</span>
							<div>
								<h3 className="text-lg font-medium">
									Two-Factor Authentication
								</h3>
								<p>Add an extra layer of security to your account with 2FA.</p>
							</div>
							<div>
								<Key />
							</div>
						</div>
						{session?.user?.twoFactorEnabled ? (
							<div>
								<div className="flex items-center gap-2">
									<UIStatus.Status
										className="bg-transparent border border-accent rounded-full"
										status="online"
									>
										<UIStatus.StatusIndicator />
										<UIStatus.StatusLabel>Enabled</UIStatus.StatusLabel>
									</UIStatus.Status>
									<Button variant="default">Disable</Button>
								</div>
							</div>
						) : (
							<div className="flex items-center gap-2">
								<UIStatus.Status
									className="bg-transparent border border-accent rounded-full"
									status="offline"
								>
									<UIStatus.StatusIndicator />
									<UIStatus.StatusLabel>Disabled</UIStatus.StatusLabel>
								</UIStatus.Status>
								<Button variant="default">Enable</Button>
							</div>
						)}
					</div>
				</div>
			</section>
			<div>
				<UITabs.TabsContent value="security">
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
				</UITabs.TabsContent>
			</div>
		</div>
	);
}
