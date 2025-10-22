import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/lib/i18n/request.ts");
const nextConfig = {
    reactCompiler: true,
    cacheComponents: true
} as NextConfig;

export default withNextIntl(nextConfig);
