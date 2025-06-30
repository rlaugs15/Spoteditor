import { Toaster } from '@/components/ui/sonner';
import { routing } from '@/i18n/routing';
import { pretendard, prompt, untitled } from '@/lib/fonts';
import Providers from '@/providers';
import '@/styles/globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Spoteditor',
  description: '어디 갈지 고민될 땐? 감각있는 Spoteditor에서 리얼 코스를 만나보세요!',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // 유효하지 않은 locale이면 404
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // locale을 서버 컴포넌트 전체에 적용 (SSG 대응)
  setRequestLocale(locale);

  // locale에 맞는 messages 불러오기
  const messages = (await import(`messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
          <Toaster position="top-right" richColors />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      </body>
    </html>
  );
}
