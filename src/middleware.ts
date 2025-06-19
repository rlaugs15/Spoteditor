import { updateSession } from '@/lib/supabase/middleware';
import createIntlMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// next-intl용 미들웨어 생성
const intlMiddleware = createIntlMiddleware(routing);

// 인증이 필요한 경로 설정
const authRequiredPaths = ['/profile/editor', '/register'];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 인증이 필요한 경로일 경우: Supabase 인증 미들웨어 실행
  if (authRequiredPaths.some((prefix) => pathname.startsWith(prefix))) {
    return await updateSession(request);
  }

  // 그 외 모든 경로: locale 감지 및 리다이렉트 처리
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // next-intl 적용할 전체 경로 (locale prefix 붙기 전 경로)
    '/((?!_next|favicon.ico|images|api|trpc|.*\\..*).*)',
  ],
};
/* 
| 경로                | 작동 내용                             |
| ----------------- | --------------------------------- |
| `/`               | 브라우저 언어 감지 → `/ko` 또는 `/en` 리다이렉트 |
| `/ko/about`       | 언어 유지한 채 정상 라우팅                   |
| `/profile/editor` | 로그인 안 되어 있으면 `/login`으로 리다이렉트     |
| `/register/join`  | 마찬가지로 로그인 필요하면 차단                 |
 */
