import { Toaster } from '@/components/ui/sonner';
import { pretendard, prompt, untitled } from '@/lib/fonts';
import Providers from '@/providers';
import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Spoteditor',
  description: '어디 갈지 고민될 땐? 감각있는 Spoteditor에서 리얼 코스를 만나보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicons/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicons/android-icon-192x192.png"
        />
        <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
      </head>
      <body
        className={`${pretendard.variable} ${untitled.variable} ${prompt.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
