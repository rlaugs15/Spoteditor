'use client';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ArrowLeftIcon } from '../Icons';

interface Header3Props {
  onAddNewPlace: () => void;
}
const Header3 = ({ onAddNewPlace }: Header3Props) => {
  const router = useRouter();
  const city = useLogCreationStore((state) => state.city);
  const sigungu = useLogCreationStore((state) => state.sigungu);

  useEffect(() => {
    if (!city || !sigungu) router.replace(REGISTER_PATHS.CITY);
  }, []);

  return (
    <header className="py-[15px] bg-white flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
          <ArrowLeftIcon />
        </Button>
        <p className="text-text-2xl font-bold">
          {city} · {sigungu}
        </p>
      </div>
      <Button
        variant={'ghost'}
        className="font-bold text-text-md !text-light-300"
        onClick={onAddNewPlace}
      >
        장소 추가
      </Button>
    </header>
  );
};

export default Header3;
