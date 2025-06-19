import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Server Component 내에서 locale + messages 불러오기
export default getRequestConfig(async ({ requestLocale }) => {
  const locale = hasLocale(routing.locales, requestLocale) ? requestLocale : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`messages/${locale}.json`)).default,
  };
});

//[locale]/layout.tsx에서 NextIntlClientProvider에 적용되어 클라이언트 전체에 번역 정보를 전달
