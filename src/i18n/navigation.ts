import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

//언어가 포함된 라우팅을 신경 안 써도 되게끔 도와줌
// 여기서 routing 설정을 기반으로 네비게이션 헬퍼 생성
export const {
  Link, // <Link> 컴포넌트
  redirect, // redirect('/about') → 자동으로 locale 붙음
  usePathname, // 현재 locale-aware 경로
  useRouter, // locale-aware router
  getPathname, // 서버에서 현재 경로 얻기
} = createNavigation(routing);

/* 사용 예시
export default function HomePage() {
  return (
    <div>
      <Link href="/about">About 페이지로 이동</Link> // /ko/about, /en/about으로 자동 변환
    </div>
  );
} */
