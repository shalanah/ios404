/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';

const wPWA = withPWA({
  dest: 'public',
  register: true,
});

const nextConfig = wPWA({
  reactStrictMode: false,
  target: 'serverless',
});

export default nextConfig;
