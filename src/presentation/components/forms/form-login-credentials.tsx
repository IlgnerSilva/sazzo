"use client";

import {
	Form,
	FormField,
	FormControl,
	FormLabel,
	FormItem,
	FormMessage,
} from "@/presentation/components/ui/form";
import { Label } from "@/presentation/components/ui/label";
import { useForm } from "react-hook-form";
import { InputEmail } from "@/presentation/components/input-email";
import { InputPassword } from "@/presentation/components/input-password";
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { Button } from "@/presentation/components/button";
import type { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useTranslations } from "next-intl";
import { Toaster } from "@/presentation/components/ui/sonner";
import { useMessageTranslation } from "@/hooks/use-message-translation";
import { loginCredentialSchema } from "@/schemas/auth";
import { signinWithCredentials } from "@/actions/auth/signin-with-credentials";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export function FormLoginCredentials() {
	const { translateMessage } = useMessageTranslation();
	const { isPending, executeAsync } = useAction(
		signinWithCredentials,
	);
	const c = useTranslations("components");
	const id = useId();

	const form = useForm<z.infer<typeof loginCredentialSchema>>({
		resolver: zodResolver(loginCredentialSchema),
		defaultValues: {
			email: "ilgnersilva@outlook.com",
			password: "Ilgner1234",
			rememberMe: false,
		},
	});

	async function onSubmit(data: z.infer<typeof loginCredentialSchema>) {
		const { serverError } = await executeAsync(data);
		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			return;
		}

		redirect("/");
	}

	return (
		<>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="mx-auto h-full max-w-80 md:max-w-sm"
				>
					<div className="mx-2 flex h-full flex-col justify-center gap-8">
						<div className="mx-auto">
							<h2 className="text-2xl text-foreground">
								{c("FormLoginCredentials.title")}
							</h2>
						</div>
						<div className="flex gap-2">
							<Button className="w-full cursor-pointer" variant="default">
								Google
							</Button>
							<Button className="w-full cursor-pointer" variant="secondary">
								Facebook
							</Button>
							<div></div>
						</div>
						<div className="flex w-full items-center justify-center">
							<div className="w-full border-t"></div>
							<div className="w-full text-nowrap bg-primary-foreground px-2 text-muted-foreground text-sm uppercase">
								{c("FormLoginCredentials.subtitle")}
							</div>
							<div className="w-full border-t"></div>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor={id}>
											{c("Inputs.email.label")}
										</FormLabel>
										<FormControl>
											<InputEmail
												id={id}
												required
												placeholder={c("Inputs.email.label")}
												className="rounded-xl"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor={id}>
											{c("Inputs.password.label")}
										</FormLabel>
										<FormControl>
											<InputPassword
												id={id}
												required
												className="rounded-xl"
												placeholder={c("Inputs.password.placeholder")}
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<div className="flex items-center justify-between">
							<FormField
								control={form.control}
								name="rememberMe"
								render={({ field }) => {
									return (
										<FormItem>
											<FormControl>
												<div className="flex items-center gap-2">
													<Checkbox
														id={id}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
													<Label htmlFor={id}>
														{c("Inputs.checkbox.label-remember")}
													</Label>
												</div>
											</FormControl>
										</FormItem>
									);
								}}
							/>
							<Link className="text-primary text-sm" href={"/forgot-password"}>
								{c("Links.forgot")}
							</Link>
						</div>
						<div>
							<Button
								className="w-full cursor-pointer"
								variant="default"
								type="submit"
								isLoading={isPending}
							>
								{c("Buttons.signin")}
							</Button>
						</div>
					</div>
				</form>
				<div className="mt-6 flex justify-center">
					<Link className="text-primary text-sm" href={"/forgot-password"}>
						{c("Links.forgot")}
					</Link>
				</div>
				<Toaster richColors position="top-center" />
			</Form>
		</>
	);
}
