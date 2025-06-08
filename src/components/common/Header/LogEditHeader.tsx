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
    <header className="py-[15px] bg-white flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <BackButton plain />
        <p className="text-text-2xl font-bold">
          {city} · {sigungu}
        </p>
      </div>
      <ConfirmDeleteDialog logTitle={logTitle} logId={logId} />
    </header>
  );
};

export default LogEditHeader;
