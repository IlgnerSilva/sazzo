import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { Button, InputEmail } from "@/presentation/components/common";
import { UIForm } from "@/presentation/components/ui";
import { enableTwoFactor } from "@/server/actions/auth/enable-two-factor";

export function FormEnabledTwoFactor() {
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
		console.log(response);
		console.log(serverError);
	}

	return (
		<UIForm.Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mx-auto h-full max-w-80 md:max-w-sm"
			>
				<div className="flex gap-2">
					<UIForm.FormField
						control={form.control}
						name="password"
						render={({ field }) => {
							return (
								<UIForm.FormItem>
									<UIForm.FormLabel htmlFor={id}>Senha</UIForm.FormLabel>
									<UIForm.FormControl>
										<InputEmail
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
						className="w-full cursor-pointer"
						variant="default"
						type="submit"
						isLoading={isPending}
					>
						Enviar
					</Button>
				</div>
			</form>
		</UIForm.Form>
	);
}
