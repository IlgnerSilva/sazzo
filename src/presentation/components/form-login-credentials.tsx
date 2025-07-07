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
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useId } from "react";
import { useTransition } from "react";
import { authClient } from "@/lib/better-auth/auth-client";
import { useTranslations } from "next-intl";

export function FormLoginCredentials() {
	const [isPending, startTransition] = useTransition();
	const c = useTranslations("components.FormLoginCredentials");
	const id = useId();
	const formSchema = z.object({
		email: z.string().email(),
		password: z.string().min(1, "Password is required"),
		rememberMe: z.boolean(),
	});
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		startTransition(async () => {
			await authClient.signIn.email({
				email: data.email,
				password: data.password,
				rememberMe: data.rememberMe,
				callbackURL: "/dashboard",
			});
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto h-full max-w-80 md:max-w-sm"
			>
				<div className="mx-2 flex h-full flex-col justify-center gap-8">
					<div className="mx-auto">
						<h2 className="text-2xl text-foreground">{c("title")}</h2>
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
							{c("subtitle")}
						</div>
						<div className="w-full border-t"></div>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>{c("inputs.email.label")}</FormLabel>
									<FormControl>
										<InputEmail
											placeholder={c("inputs.email.label")}
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
									<FormLabel>{c("inputs.password.label")}</FormLabel>
									<FormControl>
										<InputPassword
											className="rounded-xl"
											placeholder={c("inputs.password.placeholder")}
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
													{c("inputs.checkbox.label-remember")}
												</Label>
											</div>
										</FormControl>
									</FormItem>
								);
							}}
						/>
						<Link className="text-primary text-sm" href={"/forgot-password"}>
							{c("links.forgot")}
						</Link>
					</div>
					<div>
						<Button
							className="w-full cursor-pointer"
							variant="default"
							type="submit"
							isLoading={isPending}
						>
							{c("buttons.signin")}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
