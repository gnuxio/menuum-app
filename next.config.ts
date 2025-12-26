import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'dev-assets.menuum.com',
                pathname: '/avatars/**',
            },
            {
                protocol: 'https',
                hostname: 'assets.menuum.com',
                pathname: '/avatars/**',
            },
        ],
    },
};

export default nextConfig;
