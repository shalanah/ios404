/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const wPWA = withPWA({
  dest: 'public',
  register: true,
  maximumFileSizeToCacheInBytes: 5000000,
});

const nextConfig = wPWA({
  reactStrictMode: false,
  output: 'export',
});

export default nextConfig;
