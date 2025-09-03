"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import { authClient } from "@/lib/better-auth/auth-client";
import { Button } from "@/presentation/components/button";
import { InputEmail } from "@/presentation/components/input-email";
import {
	InputPassword,
	InputPasswordStrength,
} from "@/presentation/components/input-password";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { Toaster } from "@/presentation/components/ui/sonner";
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
		<Form {...form}>
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
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>{c("Inputs.name.label")}</FormLabel>
									<FormControl>
										<Input required className="rounded-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>{c("Inputs.email.label")}</FormLabel>
									<FormControl>
										<InputEmail required className="rounded-xl" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<div className="flex gap-2">
						<div>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>{c("Inputs.password.label")}</FormLabel>
											<FormControl>
												<InputPasswordStrength
													required
													className="rounded-xl"
													{...field}
												/>
											</FormControl>
										</FormItem>
									);
								}}
							/>
						</div>
						<div>
							<FormField
								control={form.control}
								name="confirmPassword"
								render={({ field }) => {
									return (
										<FormItem>
											<FormLabel>
												{c("Inputs.confirm-password.label")}
											</FormLabel>
											<FormControl>
												<InputPassword
													required
													className="rounded-xl"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
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
			<Toaster richColors position="top-center" />
		</Form>
	);
}
