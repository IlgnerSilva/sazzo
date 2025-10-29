import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";
import { sendTwoFactor } from "@/actions/two-factor.action";
import { useMessageTranslation } from "@/hooks/use-message-translation";
import { UIButton, UICard, UIChoicebox } from "./ui";

export function ChoiceTwoFactorAuthentication() {
	const c = useTranslations("components");
	const router = useRouter();
	const [typeTwoFactor, setTypeTwoFactor] = useState<"otp" | "totp">("totp");
	const { translateMessage } = useMessageTranslation();
	const { executeAsync, isPending } = useAction(sendTwoFactor);

	async function handle() {
		const { serverError, data } = await executeAsync({ typeTwoFactor });

		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			return;
		}

		if (!data) {
			toast.info("Erro inesperado, tente novamente mais tarde");
			return;
		}

		// ✅ MELHORADO: Redireciona sem passar token na URL
		if (data.needsRedirect) {
			router.push("/auth/signin/two-factor");
		}
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
						onValueChange={setTypeTwoFactor as any}
						value={typeTwoFactor}
					>
						<UIChoicebox.ChoiceboxItem key={1} value="otp">
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
