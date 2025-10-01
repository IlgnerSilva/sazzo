"use client";

import { Button } from "@/presentation/components/common";
import { UIForm, UIRadioGroup } from "@/presentation/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { useMessageTranslation } from "@/presentation/hooks/use-message-translation";
import { sendOTPTwoFactor } from "@/server/actions/auth/sendOTPTwoFactor";
import { useAction } from "next-safe-action/hooks";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { FormLabel } from "@/presentation/components/ui/form";
import { useId, useState } from "react";

export function FormSwitchVerificationTwoFactor() {
	const idTOTP = useId();
	const idOTP = useId();
	const { translateMessage } = useMessageTranslation();
	const { executeAsync } = useAction(sendOTPTwoFactor);
	const [isPending, setIsPending] = useState(false);

	const switchVerificationTwoFactorSchema = z.object({
		switchVerificationTwoFactor: z.enum(["totp", "otp"]).optional(),
	});

	const form = useForm<z.infer<typeof switchVerificationTwoFactorSchema>>({
		resolver: zodResolver(switchVerificationTwoFactorSchema),
		defaultValues: {
			switchVerificationTwoFactor: "totp",
		},
	});

	async function onSubmit(
		data: z.infer<typeof switchVerificationTwoFactorSchema>,
	) {
		setIsPending(true);
		if (data.switchVerificationTwoFactor === "totp") {
			redirect("/auth/two-factor?verify=totp");
		}

		const { serverError, data: response } = await executeAsync();
		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			setIsPending(false);
			return;
		}
		if (response?.status) {
			redirect("/auth/two-factor?verify=otp");
		}
		redirect("/");
	}
	return (
		<UIForm.Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto h-full max-w-80 md:max-w-sm"
			>
				<div className="mx-2 flex h-full flex-col justify-center gap-8">
					<UIForm.FormField
						control={form.control}
						name="switchVerificationTwoFactor"
						render={({ field }) => {
							return (
								<UIRadioGroup.RadioGroup
									onValueChange={field.onChange}
									value={field.value}
								>
									<div className="flex items-center space-x-2">
										<UIRadioGroup.RadioGroupItem value="totp" />
										<FormLabel htmlFor={idTOTP} className="font-normal">
											Via Authenticator
										</FormLabel>
									</div>
									<div className="flex items-center space-x-2">
										<UIRadioGroup.RadioGroupItem value="otp" />
										<FormLabel htmlFor={idOTP} className="font-normal">
											Via E-mail
										</FormLabel>
									</div>
								</UIRadioGroup.RadioGroup>
							);
						}}
					/>

					<div>
						<Button
							className="w-full cursor-pointer"
							variant="default"
							type="submit"
							isLoading={isPending}
						>
							Continuar
						</Button>
					</div>
				</div>
			</form>
		</UIForm.Form>
	);
}
