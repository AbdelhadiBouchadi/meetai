import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/meetings",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
