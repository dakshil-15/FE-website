import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: "/our-advantage",
        destination: "/capabilities",
        permanent: true,
      },
      {
        source: "/clients",
        destination: "/about#trusted-by",
        permanent: true,
      },
      {
        source: "/leadership",
        destination: "/about#team",
        permanent: true,
      },
      {
        source: "/locations/:slug",
        destination: "/contact#offices",
        permanent: true,
      },
      {
        source: "/industries",
        destination: "/work",
        permanent: true,
      },
      {
        source: "/industries/:slug",
        destination: "/work",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
