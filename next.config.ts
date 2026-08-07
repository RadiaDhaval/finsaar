import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/finsaar",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
