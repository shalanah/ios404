import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';

const inter = Inter_Tight({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '800'],
});

// TODO: Move more over to metadata over putting in the head
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="/light-mode-favicon.ico"
          rel="icon"
          media="(prefers-color-scheme: light)"
        />
        <link
          href="/dark-mode-favicon.ico"
          rel="icon"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://ios404.com" />
        <meta property="og:title" content="iOS404" />
        <meta
          property="og:description"
          content="The missing web features of iOS"
        />
        <meta
          property="og:image"
          content="https://ios404.com/icons/ios-404-og-1200x630.jpg"
        />
        <meta name="twitter:title" content="iOS404" />
        <meta
          name="twitter:description"
          content="The missing web features of iOS"
        />
        <meta
          name="twitter:image"
          content="https://ios404.com/icons/ios-404-og-1200x630.jpg"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@ios404website" />
        <meta name="twitter:creator" content="@shalanahfaith" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
