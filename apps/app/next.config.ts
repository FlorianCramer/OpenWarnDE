import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@openwarnde/ui", "@openwarnde/map", "@openwarnde/config"],

  allowedDevOrigins: ["127.0.0.1"],

  images: {
    unoptimized: true,
  },

  agentRules: false
};

export default nextConfig;