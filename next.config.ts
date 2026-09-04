import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/insights",
        destination: "/",
        permanent: false,
      },
      {
        source: "/insights/:path*",
        destination: "/",
        permanent: false,
      },
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
