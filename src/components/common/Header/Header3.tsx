'use client';
import { Button } from '@/components/ui/button';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useTranslations } from 'next-intl';
import BackButton from '../Button/BackButton';

interface Header3Props {
  onAddNewPlace: () => void;
}
const Header3 = ({ onAddNewPlace }: Header3Props) => {
  const city = useLogCreationStore((state) => state.city);
  const sigungu = useLogCreationStore((state) => state.sigungu);

  const tRegion = useTranslations('Region');
  const tLog = useTranslations('Register.LogPage');
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[54px] bg-white">
      <div className="py-[15px] flex items-center justify-between w-full min-w-[343px] max-w-[724px] mx-auto px-4">
        <div className="flex items-center gap-2.5">
          <BackButton plain />
          {city && sigungu ? (
            <p className="text-text-2xl font-bold">
              {tRegion(city)} · {tRegion(sigungu)}
            </p>
          ) : (
            <p className="text-text-2xl font-bold">{tLog('loading')}</p>
          )}
        </div>
        <Button
          variant="ghost"
          className="font-bold text-text-md !text-light-300 px-0 hover:!text-light-400 hover:!bg-transparent"
          onClick={onAddNewPlace}
        >
          {tLog('addPlace')}
        </Button>
      </div>
    </header>
  );
};

export default Header3;
