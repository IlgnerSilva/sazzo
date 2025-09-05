import type { Metadata } from "next";
import { MainLayout } from "@/presentation/layouts/main.layout";

export const metadata: Metadata = {
	title: "Sazzo",
	description: "Sazzo Multi Idioma",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return <MainLayout>{children}</MainLayout>;
}
