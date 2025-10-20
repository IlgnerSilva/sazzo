import { motion } from "motion/react";
import { useState } from "react";
import { UIChoicebox } from "./ui";
import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle } from "./ui/card";

export function ChoiceTwoFactorAuthentication() {
	const [typeTwoFactor, setTypeTwoFactor] = useState<string>("");
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
						<CardTitle className="text-xl">Two Factor</CardTitle>
					</CardHeader>
					<UIChoicebox.Choicebox
						onValueChange={setTypeTwoFactor}
						value={typeTwoFactor}
					>
						<UIChoicebox.ChoiceboxItem key={1} value="opt">
							<UIChoicebox.ChoiceboxItemHeader>
								<UIChoicebox.ChoiceboxItemTitle>
									Via Email
								</UIChoicebox.ChoiceboxItemTitle>
							</UIChoicebox.ChoiceboxItemHeader>
							<UIChoicebox.ChoiceboxIndicator />
						</UIChoicebox.ChoiceboxItem>
						<UIChoicebox.ChoiceboxItem key={2} value="totp">
							<UIChoicebox.ChoiceboxItemHeader>
								<UIChoicebox.ChoiceboxItemTitle>
									Via App
								</UIChoicebox.ChoiceboxItemTitle>
							</UIChoicebox.ChoiceboxItemHeader>
							<UIChoicebox.ChoiceboxIndicator />
						</UIChoicebox.ChoiceboxItem>
					</UIChoicebox.Choicebox>
				</div>
				<Button loading={true}>Continue</Button>
			</Card>
		</motion.div>
	);
}
