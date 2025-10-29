import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});
const nextConfig = {
	reactCompiler: true,
	cacheComponents: true,
	experimental: {
		optimizePackageImports: [
			"lucide-react",
			"@radix-ui/react-avatar",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-label",
			"@radix-ui/react-separator",
			"@radix-ui/react-collapsible",
		],
	},
	compiler: {
		removeConsole:
			process.env.NODE_ENV === "production"
				? {
						exclude: ["error", "warn"],
					}
				: false,
	},
	output: "standalone",
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
} as NextConfig;

export default withBundleAnalyzer(withNextIntl(nextConfig));
