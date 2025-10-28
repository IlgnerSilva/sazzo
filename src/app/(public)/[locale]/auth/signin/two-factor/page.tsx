import { type JwtPayload, verify } from "jsonwebtoken";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TwoFactorVerifyForm } from "@/components/two-factor-verify-form";
import { env } from "@/env";

export const metadata: Metadata = {
	title: "Two Factor Verify",
	description: "Template Multi Idioma",
};

const JWT_SECRET = env.TWO_FACTOR_SECRET;

interface TwoFactorPayload extends JwtPayload {
	typeTwoFactor: "otp" | "totp";
	iat?: number;
	exp?: number;
}

function validateTwoFactorToken(token: string): TwoFactorPayload | null {
	if (!JWT_SECRET) {
		console.error("JWT_SECRET não configurado");
		return null;
	}

	try {
		const decoded = verify(token, JWT_SECRET) as TwoFactorPayload;
		// Validações adicionais
		if (!decoded || typeof decoded !== "object") {
			return null;
		}

		if (!decoded.typeTwoFactor || typeof decoded.typeTwoFactor !== "string") {
			return null;
		}
		console.log("AQUI", decoded);
		return decoded;
	} catch (error) {
		// Log do erro para debugging (remova em produção ou use logger apropriado)
		if (error instanceof Error) {
			console.error("Erro ao validar token 2FA:", error.message);
		}
		return null;
	}
}

export default async function Page({
	searchParams,
}: {
	searchParams: Promise<{ typeTwoFactor?: string }>;
}) {
	const params = await searchParams;

	// Validação do parâmetro
	if (!params.typeTwoFactor || typeof params.typeTwoFactor !== "string") {
		redirect("/auth/signin");
	}
	// Validação do token
	const decoded = validateTwoFactorToken(params.typeTwoFactor);

	console.log("DECODE", params.typeTwoFactor);
	if (!decoded) {
		console.log("ERRO", params.typeTwoFactor);
		redirect("/auth/signin");
	}

	return (
		<div className="flex min-h-screen flex-1 items-center justify-center">
			<div className="h-full w-full max-w-xs">
				<TwoFactorVerifyForm typeTwoFactor={decoded.typeTwoFactor} />
			</div>
		</div>
	);
}
