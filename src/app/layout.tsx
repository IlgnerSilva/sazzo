import "./globals.css";
import "../../node_modules/flag-icons/css/flag-icons.min.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return children;
}
