import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

export const redirects = async () => {
  return [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.weeds.dk" }],
      destination: "https://weeds.dk/:path*",
      permanent: true,
    },
  ];
};
