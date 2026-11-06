import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/flowfest_clone.html',
        },
      ],
    };
  },
};

export default nextConfig;
