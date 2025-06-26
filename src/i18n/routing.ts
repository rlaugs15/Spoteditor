import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  /* 지원하려는 언어 코드 목록 */
  locales: ['en', 'ko'],
  /* 브라우저 언어 감지 실패 시 기본으로 사용할 언어 */
  defaultLocale: 'ko',
  localePrefix: 'always',
});
