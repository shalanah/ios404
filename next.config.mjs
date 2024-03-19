/** @type {import('next').NextConfig} */
import withSerwistInit from '@serwist/next';

// pwa work:
const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
});

const nextConfig = withSerwist({
  reactStrictMode: false,
});

export default nextConfig;
