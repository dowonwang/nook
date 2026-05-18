import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@packages/ui', 'packages/api-client'],
};

export default nextConfig;
