"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Button } from "@/presentation/components/common";
import { UIForm, UIInputOTP } from "@/presentation/components/ui";
import { useMessageTranslation } from "@/presentation/hooks/use-message-translation";
import { verifyTwoFactor } from "@/server/actions/auth/";
import { useRouter } from "next/navigation";

export function FormVerifyTwoFactor({
	type_verify,
	redirect,
}: {
	type_verify: "otp" | "totp";
	redirect?: boolean;
}) {
	const { translateMessage } = useMessageTranslation();
	const { isPending, executeAsync } = useAction(verifyTwoFactor);
	const id = useId();
	const router = useRouter();

	const verifyTwoFactorSchema = z.object({
		code: z.string().min(6).max(6),
	});

	const formEVerifyTwoFactor = useForm<z.infer<typeof verifyTwoFactorSchema>>({
		resolver: zodResolver(verifyTwoFactorSchema),
		defaultValues: {
			code: "",
		},
	});

	async function onSubmiVerifyTwoFactor(
		data: z.infer<typeof verifyTwoFactorSchema>,
	) {
		const { serverError, data: response } = await executeAsync({
			code: data.code,
			type: type_verify,
		});
		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			return;
		}
		if (!response) {
			toast.info("Erro inesperado, tente novamente mais tarde");
			return;
		}

		toast.success("2FA verificado com sucesso!", {
			duration: 1000,
			onAutoClose: () => {
				if (redirect) return router.push("/");
				console.log(response);
				router.refresh();
			},
		});
	}
	return (
		<UIForm.Form {...formEVerifyTwoFactor}>
			<form
				onSubmit={formEVerifyTwoFactor.handleSubmit(onSubmiVerifyTwoFactor)}
				className="mx-auto min-h-full max-full md:max-w-sm"
			>
				<div className="flex items-end justify-center gap-2">
					<UIForm.FormField
						control={formEVerifyTwoFactor.control}
						name="code"
						render={({ field }) => {
							return (
								<UIForm.FormItem>
									<UIForm.FormLabel htmlFor={id}>
										Digite o código de verificação
									</UIForm.FormLabel>
									<UIForm.FormControl>
										<UIInputOTP.InputOTP maxLength={6} {...field}>
											<UIInputOTP.InputOTPGroup>
												<UIInputOTP.InputOTPSlot index={0} />
												<UIInputOTP.InputOTPSlot index={1} />
												<UIInputOTP.InputOTPSlot index={2} />
												<UIInputOTP.InputOTPSlot index={3} />
												<UIInputOTP.InputOTPSlot index={4} />
												<UIInputOTP.InputOTPSlot index={5} />
											</UIInputOTP.InputOTPGroup>
										</UIInputOTP.InputOTP>
									</UIForm.FormControl>
									<UIForm.FormMessage />
								</UIForm.FormItem>
							);
						}}
					/>

					<Button
						className="w-full max-w-max cursor-pointer"
						variant="default"
						type="submit"
						isLoading={isPending}
					>
						Confirmar
					</Button>
				</div>
			</form>
		</UIForm.Form>
	);
}
