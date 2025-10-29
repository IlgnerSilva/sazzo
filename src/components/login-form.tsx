"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useId, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { InputPassword } from "@/components/input-password";
import {
	UIButton,
	UICard,
	UICheckbox,
	UIField,
	UIForm,
	UIInput,
} from "@/components/ui";
import { useMessageTranslation } from "@/hooks/use-message-translation";
import { authClient } from "@/lib/better-auth/auth-client";
import { cn } from "@/lib/utils";
import {
	type FormLoginSchema,
	useFormLoginSchema,
} from "@/lib/zod/schemas/formLoginSchema";
import { ChoiceTwoFactorAuthentication } from "./choice-two-factor-authentication";

export function LoginForm({
	className,
	...props
}: React.ComponentProps<"div">) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const [showRequireTwoFactor, setShowTwoFactor] = useState(false);
	const idCheckbox = useId();
	const idPassword = useId();

	const { translateMessage } = useMessageTranslation();
	const c = useTranslations("components");

	const form = useForm<FormLoginSchema>({
		resolver: zodResolver(useFormLoginSchema()),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = async (data: FormLoginSchema) => {
		startTransition(async () => {
			await authClient.signIn.email(
				{
					email: data.email,
					password: data.password,
					rememberMe: data.rememberMe,
				},
				{
					onSuccess: (ctx) => {
						if ("twoFactorRedirect" in ctx.data) {
							return setShowTwoFactor(true);
						}

						toast.success("Logged in successfully");
						return router.push("/");
					},
					onError: (ctx) => {
						toast.error(translateMessage(ctx.error.code));
					},
				},
			);
		});
	};

	return (
		<div
			className={cn("flex h-full flex-col justify-center gap-6", className)}
			{...props}
		>
			{!showRequireTwoFactor ? (
				<UICard.Card>
					<div>
						<UICard.CardHeader className="text-center">
							<UICard.CardTitle className="text-xl">
								{c("FormLoginCredentials.title")}
							</UICard.CardTitle>
						</UICard.CardHeader>
						<UICard.CardContent>
							<UIForm.Form {...form}>
								<form
									className="space-y-6"
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<UIField.FieldGroup className="w-full">
										<UIForm.FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<UIForm.FormItem>
													<UIForm.FormLabel>
														{c("Inputs.email.label")}
													</UIForm.FormLabel>
													<UIForm.FormControl>
														<UIInput.Input
															placeholder={c("Inputs.email.placeholder")}
															{...field}
														/>
													</UIForm.FormControl>
													<UIForm.FormMessage />
												</UIForm.FormItem>
											)}
										/>
										<UIForm.FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<UIForm.FormItem className="*:not-first:mt-2">
													<UIForm.FormLabel htmlFor={idPassword}>
														{c("Inputs.password.label")}
													</UIForm.FormLabel>
													<UIForm.FormControl>
														<InputPassword
															id={idPassword}
															placeholder={c("Inputs.password.placeholder")}
															{...field}
														/>
													</UIForm.FormControl>
													<UIForm.FormMessage />
												</UIForm.FormItem>
											)}
										/>
										<UIForm.FormField
											control={form.control}
											name="rememberMe"
											render={({ field }) => (
												<UIForm.FormItem className="flex items-center space-x-1">
													<UIForm.FormControl>
														<UICheckbox.Checkbox
															checked={field.value}
															id={idCheckbox}
															onCheckedChange={field.onChange}
														/>
													</UIForm.FormControl>
													<UIForm.FormLabel htmlFor={idCheckbox}>
														{c("Inputs.checkbox.label-remember")}
													</UIForm.FormLabel>
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
											{c("Buttons.signin")}
										</UIButton.Button>
									</div>
								</form>
							</UIForm.Form>
						</UICard.CardContent>
					</div>
				</UICard.Card>
			) : (
				<ChoiceTwoFactorAuthentication />
			)}
		</div>
	);
}
