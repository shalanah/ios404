import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
  features,
  scene,
}: Readonly<{
  children: React.ReactNode;
  features: React.ReactNode;
  scene: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className={inter.className}
      >
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            // background: '#efefef',
            // zIndex: -1,
          }}
        >
          {scene}
        </div>
        {/* <main
          style={{
            maxWidth: '1400px',
            margin: 'auto',
            display: 'flex',
            height: '100dvh',
            overflow: 'hidden',
          }}
        >
          <div style={{ flex: 2, padding: 'max(10vmin, 15px)' }}>
            {children}
          </div>
          <div
            style={{
              flex: 3,
              padding:
                'max(10vmin, 15px) max(10vmin, 15px) 0 calc(max(10vmin, 15px) / 2) ',
              overflowY: 'auto',
            }}
          >
            {features}
            <footer>Footer</footer>
          </div>
        </main> */}
      </body>
    </html>
  );
}
