import { MainLayout } from "@/presentation/layouts/main.layout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <MainLayout>{children}</MainLayout>;
}
