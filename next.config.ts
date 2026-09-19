import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow external image domains from NanoBanana AI
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.leansoft-ai.com",
      },
      {
        protocol: "https",
        hostname: "**.nano-banana.com",
      },
    ],
  },
  // Disable x-powered-by header
  poweredByHeader: false,
};

export default nextConfig;
