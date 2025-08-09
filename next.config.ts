﻿import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.weeds.dk" }],
        destination: "https://weeds.dk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
