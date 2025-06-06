import { PropsWithChildren } from 'react';

export default function NoHeaderFooterLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full h-dvh flex flex-col font-pretendard web:min-w-[1440px]">
      <div className="grow">{children}</div>
    </div>
  );
}
