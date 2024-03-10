import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import { globalCss } from './utils/globalcss';

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
      {/* Would like to load this to avoid background flashing */}
      <head>
        <style>{globalCss}</style>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
