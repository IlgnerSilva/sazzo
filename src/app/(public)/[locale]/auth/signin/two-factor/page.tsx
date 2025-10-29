import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { validateTwoFactorToken } from "@/actions/two-factor.action";
import { TwoFactorVerifyForm } from "@/components/two-factor-verify-form";

export const metadata: Metadata = {
	title: "Two Factor Verify",
	description: "Template Multi Idioma",
};

export default async function Page() {
	const { valid, data } = await validateTwoFactorToken();

	if (!valid || !data) {
		redirect("/auth/signin");
	}

	return (
		<div className="flex min-h-screen flex-1 items-center justify-center">
			<div className="h-full w-full max-w-xs">
				<TwoFactorVerifyForm typeTwoFactor={data.typeTwoFactor} />
			</div>
		</div>
	);
}
