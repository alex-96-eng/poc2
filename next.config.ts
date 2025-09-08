// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint in `next build`
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TS type errors in `next build`
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
