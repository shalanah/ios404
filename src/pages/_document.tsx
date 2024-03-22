import { Html, Head, Main, NextScript } from 'next/document';
import { Inter_Tight } from 'next/font/google';

const inter = Inter_Tight({
  subsets: ['latin'],
  // 700, 100, 800, 500, 300, 200, 400, "bold", "normal"
  weight: ['100', '200', '300', '400', '500', '700', '800'],
}); // use for our google font?

export default function Document() {
  return (
    <Html lang="en">
      <Head>
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
      </Head>
      <body className={inter.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
