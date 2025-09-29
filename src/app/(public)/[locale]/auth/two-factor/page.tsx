import { PageVerifyTwoFactor } from "@/presentation/pages/auth/two-factor.page";

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ verify: "otp" | "totp" }>;
}) {
	const filters = await searchParams;
	return <PageVerifyTwoFactor searchParams={filters.verify} />;
}
