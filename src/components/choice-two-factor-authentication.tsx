import { motion } from "motion/react";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { useMessageTranslation } from "@/hooks/use-message-translation";
import { authClient } from "@/lib/better-auth/auth-client";
import { UIButton, UICard, UIChoicebox } from "./ui";

export function ChoiceTwoFactorAuthentication() {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const c = useTranslations("components");
	const [typeTwoFactor, setTypeTwoFactor] = useState<string>("");
	const { translateMessage } = useMessageTranslation();

	function handle() {
		startTransition(async () => {
			if (typeTwoFactor === "opt") {
				await authClient.twoFactor.sendOtp(
					{},
					{
						onSuccess: () => {
							return router.push("/auth/signin/two-factor");
						},
						onError: (ctx) => {
							toast.error(translateMessage(ctx.error.code));
							return;
						},
					},
				);
			}
			if (typeTwoFactor === "totp") {
				return router.push("/auth/signin/two-factor");
			}
		});
	}

	return (
		<motion.div
			animate={{ x: 0 }}
			exit={{ x: -100 }}
			initial={{ x: 100 }}
			transition={{ duration: 0.5 }}
		>
			<UICard.Card className="p-4">
				<div>
					<UICard.CardHeader className="text-center">
						<UICard.CardTitle className="text-xl">
							{c("ChoiceTwoFactorAutentication.title")}
						</UICard.CardTitle>
					</UICard.CardHeader>
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
				<UIButton.Button
					className="cursor-pointer"
					disabled={isPending}
					loading={isPending}
					onClick={handle}
				>
					Continue
				</UIButton.Button>
			</UICard.Card>
		</motion.div>
	);
}
