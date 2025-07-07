'use client';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';
import BackButton from '../Button/BackButton';

interface LogRegisterHeaderProps {
  onAddNewPlace: () => void;
}
const LogRegisterHeader = ({ onAddNewPlace }: LogRegisterHeaderProps) => {
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
        <button
          className="flex items-center gap-1 font-bold text-text-md !text-black px-0 hover:!text-light-400 hover:!bg-transparent"
          onClick={onAddNewPlace}
        >
          <Plus className="text-light-500 size-4" /> {tLog('addPlace')}
        </button>
      </div>
    </header>
  );
};

export default LogRegisterHeader;
