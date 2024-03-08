import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { globalCss } from './utils/globalcss';

const inter = Inter({ subsets: ['latin'] }); // use for our google font?

export const metadata: Metadata = {
  title: 'iOS404',
  description: 'The missing web features of iOS.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Would like to load this to avoid background flashing */}
      <style>{globalCss}</style>
      <body>{children}</body>
    </html>
  );
}
