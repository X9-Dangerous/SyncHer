import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',              // frontend calls to /api/*
        destination: 'http://127.0.0.1:8000/:path*', // proxied to FastAPI backend
      },
    ];
  },
  reactCompiler: true,
};

export default nextConfig;
