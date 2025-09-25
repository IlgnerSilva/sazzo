"use client";

import {
	FormVerifyTwoFactorTOTP,
	FormVerifyTwoFactorOTP,
} from "@/presentation/components/feature/security";
import { redirect, useSearchParams } from "next/navigation";

export function PageVerifyTwoFactor() {
	// const searchParams = useSearchParams();

	// if (searchParams.get("verify") === "otp") {
	// 	return <FormVerifyTwoFactorOTP />;
	// }
	// if (searchParams.get("verify") === "totp") {
	// 	return <FormVerifyTwoFactorTOTP />;
	// }
	return <FormVerifyTwoFactorTOTP />;
	//redirect("/auth/signin");
}
