"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useId, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup } from "@/components/ui/field";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
	const [showRequireTwoFactor, setShowTwoFactor] = useState(false);
	const idCheckbox = useId();

	const { translateMessage } = useMessageTranslation();
	const c = useTranslations("components");

	const form = useForm<FormLoginSchema>({
		resolver: zodResolver(useFormLoginSchema()),
		defaultValues: {
			email: "ilgnersilva@outlook.com",
			password: "Ilgner1234",
			rememberMe: false,
		},
	});

	const onSubmit = async (data: FormLoginSchema) => {
		startTransition(async () => {
			await authClient.signIn.email(
				{
					email: data.email,
					password: data.password,
				},
				{
					onSuccess: (ctx) => {
						const authToken = ctx.response.headers.get("set-auth-token");
						localStorage.setItem("authToken", authToken || "");
						if ("twoFactorRedirect" in ctx.data) {
							setShowTwoFactor(true);
						}
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
				<Card>
					<div>
						<CardHeader className="text-center">
							<CardTitle className="text-xl">
								{c("FormLoginCredentials.title")}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<Form {...form}>
								<form
									className="space-y-6"
									onSubmit={form.handleSubmit(onSubmit)}
								>
									<FieldGroup className="w-full">
										<FormField
											control={form.control}
											name="email"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{c("Inputs.email.label")}</FormLabel>
													<FormControl>
														<Input
															placeholder={c("Inputs.email.placeholder")}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="password"
											render={({ field }) => (
												<FormItem>
													<FormLabel>{c("Inputs.password.label")}</FormLabel>
													<FormControl>
														<Input
															placeholder={c("Inputs.password.placeholder")}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
										<FormField
											control={form.control}
											name="rememberMe"
											render={({ field }) => (
												<FormItem className="flex items-center space-x-2">
													<FormControl>
														<Checkbox
															checked={field.value}
															id={idCheckbox}
															onCheckedChange={field.onChange}
														/>
													</FormControl>
													<FormLabel id={idCheckbox}>Remember me</FormLabel>
													<FormMessage />
												</FormItem>
											)}
										/>
									</FieldGroup>
									<Button
										className="cursor-pointer"
										disabled={isPending}
										loading={isPending}
										type="submit"
										variant="default"
									>
										{c("Buttons.signin")}
									</Button>
								</form>
							</Form>
						</CardContent>
					</div>
				</Card>
			) : (
				<ChoiceTwoFactorAuthentication />
			)}
		</div>
	);
}
