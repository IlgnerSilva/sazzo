import { cookies } from "next/headers";
import { TwoFactorVerifyForm } from "@/components/two-factor-verify-form";
export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	// const cookiesStore = await cookies();
	// const authToken = cookiesStore.get("sazzo.two_factor");
	// console.log(authToken);
	return (
		<div className="flex max-h-screen flex-1 items-center justify-center">
			<div className="h-full w-full max-w-xs">
				<TwoFactorVerifyForm />
			</div>
		</div>
	);
}
