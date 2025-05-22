import { fetchLog } from '@/app/actions/log';
import { PenBlackIcon, TableIcon } from '@/components/common/Icons';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import LogAuthorIntro from '@/components/features/detail-log/LogAuthorIntro';
import LogContent from '@/components/features/detail-log/LogContent';
import LogThubmnail from '@/components/features/detail-log/LogThubmnail';

interface LogDetailPageProps {
  params: {
    logId: string;
  };
}

const LogDetailPage = async ({ params }: LogDetailPageProps) => {
  const { logId } = await params;
  const { data: logData } = await fetchLog(logId);

  return (
    <div>
      <LogThubmnail logData={logData} />
      <main className="flex flex-col px-4 web:px-[50px]">
        <LogAuthorIntro userId={logData.user_id} logDescription={logData.description ?? ''} />
        <div>
          {logData.place.map((place, idx) => (
            <LogContent key={place.place_id} place={place} idx={idx + 1} />
          ))}
        </div>
      </main>
      <div className="flex flex-col gap-2 fixed z-10 bottom-10 right-4">
        <ExtraActionButton className="bg-white w-11 h-11">
          <PenBlackIcon />
        </ExtraActionButton>
        <ExtraActionButton className="bg-white w-11 h-11">
          <TableIcon />
        </ExtraActionButton>
      </div>
    </div>
  );
};

export default LogDetailPage;
