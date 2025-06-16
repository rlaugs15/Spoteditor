import ConfirmDeleteDialog from '@/components/features/log/edit/ConfirmDeleteDialog';
import BackButton from '../Button/BackButton';

interface LogEditHeaderProps {
  city: string;
  sigungu: string;
  logTitle: string;
  logId: string;
}

const LogEditHeader = ({ city, sigungu, logTitle, logId }: LogEditHeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[54px] bg-white">
      <div className="py-[15px] flex items-center justify-between w-full min-w-[343px] max-w-[724px] mx-auto px-4">
        <div className="flex items-center gap-2.5">
          <BackButton plain />
          <p className="text-text-2xl font-bold">
            {city} · {sigungu}
          </p>
        </div>
        <ConfirmDeleteDialog logTitle={logTitle} logId={logId} />
      </div>
    </header>
  );
};

export default LogEditHeader;
