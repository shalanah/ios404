/** @type {import('next').NextConfig} */

import withPWA from 'next-pwa';
import withSvgr from 'next-plugin-svgr';
import withPlugins from 'next-compose-plugins';

const wPWA = withPWA({
  dest: 'public',
  register: true,
  maximumFileSizeToCacheInBytes: 5000000,
});

const nextConfig = withPlugins([wPWA, withSvgr], {
  reactStrictMode: false,
  output: 'export',
  images: {
    unoptimized: true,
  },
});

export default nextConfig;
