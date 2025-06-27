'use client';

import ConfirmDeleteDialog from '@/components/features/log/edit/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
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
  const t = useTranslations('Region');
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[54px] bg-white">
      <div className="py-[15px] flex items-center justify-between w-full min-w-[343px] max-w-[724px] mx-auto px-4">
        <div className="flex items-center gap-2.5">
          <BackButton plain />
          <p className="text-text-2xl font-bold">
            {t(`${city}`)} · {t(`${sigungu}`)}
          </p>
        </div>
        <div className="space-x-[14px]">
          <Button
            variant="ghost"
            className="font-bold text-text-md !text-light-300 px-0 hover:!text-light-400 hover:!bg-transparent"
            onClick={onAddNewPlace}
          >
            장소 추가
          </Button>
          <ConfirmDeleteDialog logTitle={logTitle} logId={logId} />
        </div>
      </div>
    </header>
  );
};

export default LogEditHeader;
