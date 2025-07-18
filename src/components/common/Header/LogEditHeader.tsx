'use client';

import ConfirmDeleteDialog from '@/components/features/log/edit/ConfirmDeleteDialog';
import { useTranslations } from 'next-intl';
import BackButton from '../Button/BackButton';

interface LogEditHeaderProps {
  city: string;
  sigungu: string;
  logTitle: string;
  logId: string;
  onAddNewPlace: () => void;
}

const LogEditHeader = ({ city, sigungu, logTitle, logId, onAddNewPlace }: LogEditHeaderProps) => {
  const t = useTranslations();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[54px] bg-white">
      <div className="py-[15px] flex items-center justify-between w-full min-w-[343px] max-w-[724px] mx-auto px-4">
        <div className="flex items-center gap-2.5">
          <BackButton plain />
          <p className="text-text-2xl font-bold">
            {t(`Region.${city}`)} · {t(`Region.${sigungu}`)}
          </p>
        </div>
        <div className="flex items-center space-x-[14px] gap-2">
          <button
            className="flex items-center justify-center gap-1.5 font-semibold text-text-md bg-black text-white rounded-full px-3 py-1.5 hover:bg-light-900 hover:text-white"
            onClick={onAddNewPlace}
          >
            <img src="/icons/PlusSemibold.svg" alt="Plus" className="w-4 h-4" />
            {t('Register.LogPage.addPlace')}
          </button>
          {/* <Button
            variant="ghost"
            className="font-bold text-text-md !text-light-300 px-0 hover:!text-light-400 hover:!bg-transparent"
            onClick={onAddNewPlace}
          >
            {t('Register.LogPage.addPlace')}
          </Button> */}
          <ConfirmDeleteDialog logTitle={logTitle} logId={logId} />
        </div>
      </div>
    </header>
  );
};

export default LogEditHeader;
