import { createServerClient } from '@supabase/ssr';
import { NextRequest } from 'next/server';

export async function fetchUserSupabaseWithRequest(request: NextRequest) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(), // NextRequest에서 직접 쿠키 꺼내기
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}
/* 미들웨어에서 유저 로그인 여부를 알기 위해 사용할 함수
미들웨어는 서버 컴포넌트처럼 request, response가 자동으로 연결되지 않고 NextRequest만 수동으로 주어짐
즉, getUser()에 들어 있는 쿠키도 Supabase가 자동으로 인식 못 한다.
그러므로 쿠키를 직접 넘겨줘야 한다. */
