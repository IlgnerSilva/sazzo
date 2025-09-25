"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAction } from "next-safe-action/hooks";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";
import {
	Button,
	InputEmail,
	InputPassword,
} from "@/presentation/components/common";
import {
	UIAlertDialog,
	UICheckbox,
	UIForm,
} from "@/presentation/components/ui";
import { Label } from "@/presentation/components/ui/label";
import { useMessageTranslation } from "@/presentation/hooks/use-message-translation";
import { signinWithCredentials } from "@/server/actions/auth/signin-with-credentials";
import { XCircle } from "lucide-react";
import { FormSwitchVerificationTwoFactor } from "@/presentation/components/feature/security/components/form-switch-verification-two-factor";

export function FormLoginCredentials() {
	const { translateMessage } = useMessageTranslation();
	const { isPending, executeAsync } = useAction(signinWithCredentials);
	const [isTwoFactor, setIsTwoFactor] = useState(false);
	const c = useTranslations("components");
	const id = useId();

	const loginCredentialSchema = z.object({
		email: z.email(),
		password: z.string().min(8),
		rememberMe: z.boolean(),
	});

	const form = useForm<z.infer<typeof loginCredentialSchema>>({
		resolver: zodResolver(loginCredentialSchema),
		defaultValues: {
			email: "ilgnersilva@outlook.com",
			password: "Ilgner1234",
			rememberMe: false,
		},
	});

	async function onSubmit(data: z.infer<typeof loginCredentialSchema>) {
		const { serverError, data: response } = await executeAsync(data);
		if (serverError) {
			const message = translateMessage(serverError.code || "");
			toast.error(message);
			return;
		}
		if (response?.twoFactorRedirect) {
			setIsTwoFactor(true);
			return;
		}
		redirect("/");
	}

	return (
		<>
			<UIForm.Form {...form}>
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
							<div />
						</div>
						<div className="flex w-full items-center justify-center">
							<div className="w-full border-t" />
							<div className="w-full text-nowrap bg-primary-foreground px-2 text-muted-foreground text-sm uppercase">
								{c("FormLoginCredentials.subtitle")}
							</div>
							<div className="w-full border-t" />
						</div>
						<UIForm.FormField
							control={form.control}
							name="email"
							render={({ field }) => {
								return (
									<UIForm.FormItem>
										<UIForm.FormLabel htmlFor={id}>
											{c("Inputs.email.label")}
										</UIForm.FormLabel>
										<UIForm.FormControl>
											<InputEmail
												id={id}
												required
												placeholder={c("Inputs.email.label")}
												className="rounded-xl"
												{...field}
											/>
										</UIForm.FormControl>
										<UIForm.FormMessage />
									</UIForm.FormItem>
								);
							}}
						/>
						<UIForm.FormField
							control={form.control}
							name="password"
							render={({ field }) => {
								return (
									<UIForm.FormItem>
										<UIForm.FormLabel htmlFor={id}>
											{c("Inputs.password.label")}
										</UIForm.FormLabel>
										<UIForm.FormControl>
											<InputPassword
												id={id}
												required
												className="rounded-xl"
												placeholder={c("Inputs.password.placeholder")}
												{...field}
											/>
										</UIForm.FormControl>
										<UIForm.FormMessage />
									</UIForm.FormItem>
								);
							}}
						/>
						<div className="flex items-center justify-between">
							<UIForm.FormField
								control={form.control}
								name="rememberMe"
								render={({ field }) => {
									return (
										<UIForm.FormItem>
											<UIForm.FormControl>
												<div className="flex items-center gap-2">
													<UICheckbox.Checkbox
														id={id}
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
													<Label htmlFor={id}>
														{c("Inputs.checkbox.label-remember")}
													</Label>
												</div>
											</UIForm.FormControl>
										</UIForm.FormItem>
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
			</UIForm.Form>

			{isTwoFactor && (
				<UIAlertDialog.AlertDialog defaultOpen={isTwoFactor}>
					<UIAlertDialog.AlertDialogContent>
						<UIAlertDialog.AlertDialogHeader className="flex items-center justify-between">
							<UIAlertDialog.AlertDialogTitle className="self-start">
								Requer fator de autenticação
							</UIAlertDialog.AlertDialogTitle>
							<UIAlertDialog.AlertDialogCancel
								className="self-end cursor-pointer"
								onChange={() => setIsTwoFactor(false)}
							>
								<XCircle />
							</UIAlertDialog.AlertDialogCancel>
						</UIAlertDialog.AlertDialogHeader>
						<hr />
						<UIAlertDialog.AlertDialogDescription>
							<FormSwitchVerificationTwoFactor />
						</UIAlertDialog.AlertDialogDescription>
					</UIAlertDialog.AlertDialogContent>
				</UIAlertDialog.AlertDialog>
			)}
		</>
	);
}
