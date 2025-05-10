'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '../Icons';

const Header3 = () => {
  const router = useRouter();
  return (
    <header className="py-[15px] bg-white flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
          <ArrowLeftIcon />
        </Button>
        <p className="text-text-2xl font-bold">서울 · 종로구</p>
      </div>
      <Button variant={'ghost'} className="font-bold text-text-md !text-light-300">
        장소 추가
      </Button>
    </header>
  );
};

export default Header3;
