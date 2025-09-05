"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { authClient } from "@/lib/better-auth/auth-client";
import {
	Button,
	InputEmail,
	InputPassword,
	InputPasswordStrength,
} from "@/presentation/components/common";
import { UIForm, UIInput, UISonner } from "@/presentation/components/ui";
import { useMessageTranslation } from "@/presentation/hooks/use-message-translation";

export function FormSignUp() {
	const [isPending, startTransition] = useTransition();
	const { translateMessage } = useMessageTranslation();
	const c = useTranslations("components");

	const formSchema = z
		.object({
			name: z.string(),
			email: z.email(),
			password: z.string().min(8),
			confirmPassword: z.string(),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: c("Inputs.password.validations.matcher-password"),
			path: ["confirmPassword"],
		});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		startTransition(async () => {
			await authClient.signUp.email(data, {
				onError(ctx) {
					const message = translateMessage(ctx.error.code);
					toast.error(message);
				},
				onSuccess(ctx) {
					console.log(ctx);
				},
			});
		});
	}

	return (
		<UIForm.Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto h-full max-w-80 md:max-w-sm"
			>
				<div className="mx-2 flex h-full flex-col justify-center gap-6">
					<div className="mx-auto">
						<h2 className="text-2xl text-foreground">
							{c("FormSignUpCredentials.title")}
						</h2>
					</div>
					<div className="flex gap-2">
						<Button className="w-full cursor-pointer" variant="default">
							Google
						</Button>
						<Button className="w-full cursor-pointer" variant="secondary">
							Facebook
						</Button>
						<div />
					</div>
					<div className="flex w-full items-center justify-center">
						<div className="w-full border-t" />
						<div className="w-full text-nowrap bg-primary-foreground px-2 text-muted-foreground text-sm uppercase">
							{c("FormSignUpCredentials.subtitle")}
						</div>
						<div className="w-full border-t" />
					</div>
					<UIForm.FormField
						control={form.control}
						name="name"
						render={({ field }) => {
							return (
								<UIForm.FormItem>
									<UIForm.FormLabel>{c("Inputs.name.label")}</UIForm.FormLabel>
									<UIForm.FormControl>
										<UIInput.Input required className="rounded-xl" {...field} />
									</UIForm.FormControl>
									<UIForm.FormMessage />
								</UIForm.FormItem>
							);
						}}
					/>
					<UIForm.FormField
						control={form.control}
						name="email"
						render={({ field }) => {
							return (
								<UIForm.FormItem>
									<UIForm.FormLabel>{c("Inputs.email.label")}</UIForm.FormLabel>
									<UIForm.FormControl>
										<InputEmail required className="rounded-xl" {...field} />
									</UIForm.FormControl>
									<UIForm.FormMessage />
								</UIForm.FormItem>
							);
						}}
					/>
					<div className="flex gap-2">
						<div>
							<UIForm.FormField
								control={form.control}
								name="password"
								render={({ field }) => {
									return (
										<UIForm.FormItem>
											<UIForm.FormLabel>
												{c("Inputs.password.label")}
											</UIForm.FormLabel>
											<UIForm.FormControl>
												<InputPasswordStrength
													required
													className="rounded-xl"
													{...field}
												/>
											</UIForm.FormControl>
										</UIForm.FormItem>
									);
								}}
							/>
						</div>
						<div>
							<UIForm.FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => {
									return (
										<UIForm.FormItem>
											<UIForm.FormLabel>
												{c("Inputs.confirm-password.label")}
											</UIForm.FormLabel>
											<UIForm.FormControl>
												<InputPassword
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
						</div>
					</div>

					<div>
						<Button
							className="w-full cursor-pointer"
							variant="default"
							type="submit"
							isLoading={isPending}
						>
							{c("Buttons.signup")}
						</Button>
					</div>
				</div>
			</form>
			<UISonner.Toaster richColors position="top-center" />
		</UIForm.Form>
	);
}
