import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@openwarnde/ui", "@openwarnde/map", "@openwarnde/config"],
  agentRules: false,

  allowedDevOrigins: ["127.0.0.1"],

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
