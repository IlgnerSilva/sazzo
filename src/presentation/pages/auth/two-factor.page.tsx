import { FormVerifyTwoFactor } from "@/presentation/components/feature/security";
import { redirect } from "next/navigation";

interface Props {
	searchParams: "otp" | "totp";
}

export function PageVerifyTwoFactor({ searchParams }: Props) {
	if (!searchParams) redirect("/auth/signin");

	return <FormVerifyTwoFactor type_verify={searchParams} redirect={true} />;
}
