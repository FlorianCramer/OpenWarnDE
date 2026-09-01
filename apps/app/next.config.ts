import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  output: "export",

  allowedDevOrigins: ["127.0.0.1"],

  images: {
    unoptimized: true,
  },
};

export default withFlowbiteReact(nextConfig);