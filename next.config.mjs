/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const wPWA = withPWA({
  dest: 'public',
  register: true,
});

const nextConfig = wPWA({
  reactStrictMode: false,
  output: 'export',
  maximumFileSizeToCacheInBytes: 5000000,
});

export default nextConfig;
