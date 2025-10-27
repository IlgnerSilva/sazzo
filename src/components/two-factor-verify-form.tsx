"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { verifyTwoFactor } from "@/actions/two-factor.action";
import { UIButton, UICard, UIField, UIForm } from "@/components/ui";
import { useMessageTranslation } from "@/hooks/use-message-translation";
import { authClient } from "@/lib/better-auth/auth-client";
import { cn } from "@/lib/utils";
import {
	type FormTwoFactorSchema,
	useFormTwoFactorSchema,
} from "@/lib/zod/schemas/verifyTwoFactorSchema";
import { UIInputOTP } from "./ui";
import { InputOTP } from "./ui/input-otp";

export function TwoFactorVerifyForm({
	className,
	typeTwoFactor,
	...props
}: React.ComponentProps<"div"> & {
	typeTwoFactor: "otp" | "totp";
}) {
	const { executeAsync, isPending } = useAction(verifyTwoFactor);
	const router = useRouter();
	const { translateMessage } = useMessageTranslation();
	const c = useTranslations("components");

	const form = useForm<FormTwoFactorSchema>({
		resolver: zodResolver(useFormTwoFactorSchema()),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = async (data: FormTwoFactorSchema) => {
		const { serverError } = await executeAsync({
			code: data.code,
			typeTwoFactor,
		});
		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			return;
		}
		if (!data) {
			toast.info("Erro inesperado, tente novamente mais tarde");
			return;
		}
		toast.success("Logged in successfully");
		return router.push("/");
	};

	return (
		<div
			className={cn("flex h-full flex-col justify-center gap-6", className)}
			{...props}
		>
			<UICard.Card>
				<div>
					<UICard.CardHeader className="text-center">
						<UICard.CardTitle className="text-xl">
							Verificação de dois fatores
						</UICard.CardTitle>
					</UICard.CardHeader>
					<UICard.CardContent>
						<UIForm.Form {...form}>
							<form
								className="space-y-6"
								onSubmit={form.handleSubmit(onSubmit)}
							>
								<UIField.FieldGroup className="mt-5 w-full">
									<UIForm.FormField
										control={form.control}
										name="code"
										render={({ field }) => (
											<UIForm.FormItem>
												<UIForm.FormLabel>Code</UIForm.FormLabel>
												<InputOTP
													{...field}
													maxLength={6}
													pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
												>
													<UIInputOTP.InputOTPGroup>
														<UIInputOTP.InputOTPSlot index={0} />
													</UIInputOTP.InputOTPGroup>
													<UIInputOTP.InputOTPGroup>
														<UIInputOTP.InputOTPSlot index={1} />
													</UIInputOTP.InputOTPGroup>
													<UIInputOTP.InputOTPGroup>
														<UIInputOTP.InputOTPSlot index={2} />
													</UIInputOTP.InputOTPGroup>
													<UIInputOTP.InputOTPGroup>
														<UIInputOTP.InputOTPSlot index={3} />
													</UIInputOTP.InputOTPGroup>
													<UIInputOTP.InputOTPGroup>
														<UIInputOTP.InputOTPSlot index={4} />
													</UIInputOTP.InputOTPGroup>
													<UIInputOTP.InputOTPGroup>
														<UIInputOTP.InputOTPSlot index={5} />
													</UIInputOTP.InputOTPGroup>
												</InputOTP>
												<UIForm.FormMessage />
											</UIForm.FormItem>
										)}
									/>
								</UIField.FieldGroup>
								<div className="w-full">
									<UIButton.Button
										className="w-full cursor-pointer"
										disabled={isPending}
										loading={isPending}
										type="submit"
										variant="default"
									>
										Validate
									</UIButton.Button>
								</div>
							</form>
						</UIForm.Form>
					</UICard.CardContent>
				</div>
			</UICard.Card>
		</div>
	);
}
