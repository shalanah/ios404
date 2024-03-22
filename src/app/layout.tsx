import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import { globalCss } from '../utils/globalcss';

const inter = Inter_Tight({
  subsets: ['latin'],
  // 700, 100, 800, 500, 300, 200, 400, "bold", "normal"
  weight: ['100', '200', '300', '400', '500', '700', '800'],
}); // use for our google font?

export const metadata: Metadata = {
  title: 'iOS404',
  description: 'The missing web features of iOS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <style type="text/css">{globalCss}</style>
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
        <meta property="og:title" content="iOS404" />
        <meta
          property="og:description"
          content="The missing web features of iOS"
        />
        <meta
          property="og:image"
          content="https://ios404.com/icons/ios-404-og-1200x630.jpg"
        />
      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
