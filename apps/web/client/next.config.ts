import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@packages/ui', '@packages/api-client', '@packages/i18n'],
  reactStrictMode: false,
};

export default nextConfig;
