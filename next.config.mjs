import { createSecureHeaders } from "./security-headers.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    typedRoutes: true
  },
  images: {
    domains: ["res.cloudinary.com"],
    formats: ["image/avif", "image/webp"]
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: createSecureHeaders()
    }
  ]
};

export default nextConfig;
