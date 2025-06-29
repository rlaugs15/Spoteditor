import createIntlMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';
import { fetchUserSupabaseWithRequest } from './lib/auth';

const intlMiddleware = createIntlMiddleware(routing);

// 인증이 필요한 경로 (locale prefix 포함)
const protectedRoutes = [/^\/(ko|en)\/profile\/editor$/, /^\/(ko|en)\/register(\/.*)?$/];

// 미들웨어 실행
export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  // locale 추출
  const locale = pathname.split('/')[1] || routing.defaultLocale;

  // 보호 경로 여부 판단
  const isProtected = protectedRoutes.some((regex) => regex.test(pathname));

  // 인증 필요 경로인데 비로그인 유저일 경우 홈으로 리디렉트
  if (isProtected) {
    const userId = await fetchUserSupabaseWithRequest(request);
    const isLoggedIn = !!userId;

    if (!isLoggedIn) {
      return Response.redirect(new URL(`/${locale}/login`, request.url));
    }
  }

  // 그 외에는 next-intl 미들웨어로 처리 (로케일 협상, 리디렉션, alternate 링크 등)
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // 다국어 라우팅을 위한 모든 경로를 포함하되,
    // 정적 파일이나 API는 제외
    '/((?!api|_next|favicon.ico|.*\\..*).*)',
  ],
};
