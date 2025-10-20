import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { UIChoicebox } from "./ui";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

export function ChoiceTwoFactorAuthentication() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const c = useTranslations("components");
	const [typeTwoFactor, setTypeTwoFactor] = useState<string>("");

	function handle() {
		startTransition(async () => {
			await authClient.twoFactor.sendOtp(
				{},
				{
					onSuccess: () => {
						router.push("/auth/signin/two-factor");
					},
					onError: (ctx) => {
						console.error(ctx);
					},
				},
			);
		});
	}

	return (
		<motion.div
			animate={{ x: 0 }}
			exit={{ x: -100 }}
			initial={{ x: 100 }}
			transition={{ duration: 0.5 }}
		>
			<Card className="p-4">
				<div>
					<CardHeader className="text-center">
						<CardTitle className="text-xl">
							{c("ChoiceTwoFactorAutentication.title")}
						</CardTitle>
					</CardHeader>
					<UIChoicebox.Choicebox
						onValueChange={setTypeTwoFactor}
						value={typeTwoFactor}
					>
						<UIChoicebox.ChoiceboxItem key={1} value="opt">
							<UIChoicebox.ChoiceboxItemHeader>
								<UIChoicebox.ChoiceboxItemTitle>
									{c("ChoiceTwoFactorAutentication.sendChoice.email")}
								</UIChoicebox.ChoiceboxItemTitle>
							</UIChoicebox.ChoiceboxItemHeader>
							<UIChoicebox.ChoiceboxIndicator />
						</UIChoicebox.ChoiceboxItem>
						<UIChoicebox.ChoiceboxItem key={2} value="totp">
							<UIChoicebox.ChoiceboxItemHeader>
								<UIChoicebox.ChoiceboxItemTitle>
									{c("ChoiceTwoFactorAutentication.sendChoice.app")}
								</UIChoicebox.ChoiceboxItemTitle>
							</UIChoicebox.ChoiceboxItemHeader>
							<UIChoicebox.ChoiceboxIndicator />
						</UIChoicebox.ChoiceboxItem>
					</UIChoicebox.Choicebox>
				</div>
				<Button
					className="cursor-pointer"
					disabled={isPending}
					loading={isPending}
					onClick={handle}
				>
					Continue
				</Button>
			</Card>
		</motion.div>
	);
}
