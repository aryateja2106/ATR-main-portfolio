import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
  },
  async headers() {
    return [
      {
        source: '/resume/:path*',
        headers: [
          {
            key: 'Content-Disposition',
            value: 'attachment; filename="Arya_Teja_PM_Resume.pdf"',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'ui.shadcn.com',
      },
      {
        protocol: 'https',
        hostname: 'cursor.com',
      },
    ],
  },
  webpack: (config) => {

    return config;
  },
};

export default nextConfig;
