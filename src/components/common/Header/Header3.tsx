'use client';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import BackButton from '../Button/BackButton';

interface Header3Props {
  onAddNewPlace: () => void;
}
const Header3 = ({ onAddNewPlace }: Header3Props) => {
  const router = useRouter();
  const country = useLogCreationStore((state) => state.country);
  const city = useLogCreationStore((state) => state.city);
  const sigungu = useLogCreationStore((state) => state.sigungu);

  useEffect(() => {
    if (!country || !city || !sigungu) router.replace(REGISTER_PATHS.COUNTRY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[54px] backdrop-blur-sm">
      <div className="py-[15px] flex items-center justify-between w-full min-w-[343px] max-w-[724px] mx-auto px-4">
        <div className="flex items-center gap-2.5">
          <BackButton plain />
          <p className="text-text-2xl font-bold">서울 · 강남구</p>
        </div>
        <Button
          variant="ghost"
          className="font-bold text-text-md !text-light-300 px-0"
          onClick={onAddNewPlace}
        >
          장소 추가
        </Button>
      </div>
    </header>
  );
};

export default Header3;
