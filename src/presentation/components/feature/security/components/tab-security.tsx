import { Key, ShieldCheck, Smartphone, XCircle } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/presentation/components/common";
import { UIAlertDialog, UIStatus } from "@/presentation/components/ui";
import { getSessionWithAutenticaded } from "@/server/dal/getSessionWithAutenticaded";
import { FormEnabledTwoFactor } from "./form-enablad-two-factor";
import { FormDisabledTwoFactor } from "./form-disabled-two-factor";

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
						<div className="flex items-center gap-2">
							<UIStatus.Status
								className="bg-transparent border border-accent rounded-full"
								status={session?.user?.twoFactorEnabled ? "online" : "offline"}
							>
								<UIStatus.StatusIndicator />
								<UIStatus.StatusLabel>
									{session?.user?.twoFactorEnabled ? "Enabled" : "Disabled"}
								</UIStatus.StatusLabel>
							</UIStatus.Status>
							<UIAlertDialog.AlertDialog>
								<UIAlertDialog.AlertDialogTrigger asChild>
									<Button className="cursor-pointer" variant="default">
										{session?.user?.twoFactorEnabled ? "Disabled" : "Enabled"}
									</Button>
								</UIAlertDialog.AlertDialogTrigger>
								<UIAlertDialog.AlertDialogContent>
									<UIAlertDialog.AlertDialogHeader className="flex items-center justify-between">
										<UIAlertDialog.AlertDialogTitle className="self-start">
											{session?.user?.twoFactorEnabled
												? "Desabilitar login em duas etapas"
												: "Habilitar login em duas etapas"}
										</UIAlertDialog.AlertDialogTitle>
										<UIAlertDialog.AlertDialogCancel className="self-end cursor-pointer">
											<XCircle />
										</UIAlertDialog.AlertDialogCancel>
									</UIAlertDialog.AlertDialogHeader>
									<hr />
									<UIAlertDialog.AlertDialogDescription>
										{session?.user?.twoFactorEnabled ? (
											<FormDisabledTwoFactor />
										) : (
											<FormEnabledTwoFactor />
										)}
									</UIAlertDialog.AlertDialogDescription>
								</UIAlertDialog.AlertDialogContent>
							</UIAlertDialog.AlertDialog>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
