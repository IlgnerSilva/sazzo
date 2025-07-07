import { AuthLayout } from "@/presentation/layouts/auth.layout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <AuthLayout>{children}</AuthLayout>;
}
