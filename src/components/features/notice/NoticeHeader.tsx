'use client';

import { ArrowLeftIcon } from '@/components/common/Icons';
import { useRouter } from '@/i18n/navigation';

interface NoticeHeaderProps {
  title: string;
}

export default function NoticeHeader({ title }: NoticeHeaderProps) {
  const router = useRouter();
  return (
    <header className="w-full sticky top-0 bg-white flex justify-start items-center pt-3 gap-2.5 pb-0.5 border-b-[1px] border-b-primary-50">
      <button onClick={() => router.back()} className="pl-4 py-3.5">
        <ArrowLeftIcon className="w-[17px] h-[17px]" />
      </button>
      <h2 className="font-bold text-text-2xl">{title}</h2>
    </header>
  );
}
