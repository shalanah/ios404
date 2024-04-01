import type { Metadata, ResolvedViewport, Viewport } from 'next';
import { Inter_Tight } from 'next/font/google';

const inter = Inter_Tight({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '800'],
});

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
  interactiveWidget: 'resizes-content', // See android chrome issue : https://stackoverflow.com/a/77879573/2824643
};

export const metadata: Metadata = {
  title: 'iOS404',
  description: 'The missing web features of iOS',
  keywords: [
    'iOS',
    'web',
    'features',
    'missing',
    'webkit',
    'safari',
    'web devs',
    'web development',
    'web standards',
    'whatwg',
    'w3c',
    'caniuse',
    'ios404',
  ],
  icons: [
    {
      url: '/light-mode-favicon.ico',
      rel: 'icon',
      media: '(prefers-color-scheme: light)',
    },
    {
      url: '/dark-mode-favicon.ico',
      rel: 'icon',
      media: '(prefers-color-scheme: dark)',
    },
  ],

  manifest: '/manifest.json',
  twitter: {
    title: 'iOS404',
    description: 'The missing web features of iOS',
    images: 'https://ios404.com/icons/ios-404-og-1200x630.jpg',
    card: 'summary_large_image',
    site: '@ios404website',
    creator: '@shalanahfaith',
  },
  // viewport,
  openGraph: {
    type: 'website',
    url: 'https://ios404.com',
    title: 'iOS404',
    description: 'The missing web features of iOS',
    images: 'https://ios404.com/icons/ios-404-og-1200x630.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
