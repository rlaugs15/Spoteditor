'use client';

import { useRouter } from '@/i18n/navigation';

export default function NoticeList() {
  const router = useRouter();

  return (
    <section className="flex flex-col w-full">
      {Array.from({ length: 1 }).map((_, idx) => (
        <article
          key={idx}
          onClick={() => router.push(`/notice/${idx}`)}
          className="w-full px-4 py-5 gap-[3px] flex flex-col border-b-[1px] border-b-primary-50 hover:cursor-pointer"
        >
          <h3 className="font-medium text-text-sm">
            플레이스서프 ‘서비스 이용약관’ 변경에 대한 안내
          </h3>
          <time className="text-text-xs text-primary-400">2025.03.15</time>
        </article>
      ))}
    </section>
  );
}
