import "./globals.css";
import "../../node_modules/flag-icons/css/flag-icons.min.css";
import { Toaster } from "sonner";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>
	{children}
	<Toaster richColors position="top-center" />
	</>
}
