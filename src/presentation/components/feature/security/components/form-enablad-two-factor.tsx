"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { Button, InputPassword } from "@/presentation/components/common";
import { UIForm, UIQRCodeClient } from "@/presentation/components/ui";
import { useMessageTranslation } from "@/presentation/hooks/use-message-translation";
import { enableTwoFactor } from "@/server/actions/auth/enable-two-factor";

export function FormEnabledTwoFactor() {
	const [viewQRCode, setViwQRCode] = useState<boolean | string>(false);
	const { translateMessage } = useMessageTranslation();
	const { isPending, executeAsync } = useAction(enableTwoFactor);
	const id = useId();

	const enabledTwoFactorSchema = z.object({
		password: z.string(),
	});

	const form = useForm<z.infer<typeof enabledTwoFactorSchema>>({
		resolver: zodResolver(enabledTwoFactorSchema),
		defaultValues: {
			password: "Ilgner1234",
		},
	});

	async function onSubmit(data: z.infer<typeof enabledTwoFactorSchema>) {
		const { serverError, data: response } = await executeAsync(data);
		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			return;
		}
		setViwQRCode(response?.totpURI);
	}

	return (
		<>
			{viewQRCode === false ? (
				<UIForm.Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="mx-auto h-full max-w-80 md:max-w-sm"
					>
						<div className="flex items-end justify-center gap-2">
							<UIForm.FormField
								control={form.control}
								name="password"
								render={({ field }) => {
									return (
										<UIForm.FormItem>
											<UIForm.FormLabel htmlFor={id}>Senha</UIForm.FormLabel>
											<UIForm.FormControl>
												<InputPassword
													id={id}
													required
													className="rounded-xl"
													{...field}
												/>
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
								Enviar
							</Button>
						</div>
					</form>
				</UIForm.Form>
			) : (
				<UIQRCodeClient.QRCode data={viewQRCode} />
			)}
		</>
	);
}
