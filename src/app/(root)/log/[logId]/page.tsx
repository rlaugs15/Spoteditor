import { fetchLog } from '@/app/actions/log';
import { getUser } from '@/app/actions/user';
import LogBookMarkButton from '@/components/common/Button/Bookmark/LogBookMarkButton';
import { PenBlackIcon, TableIcon } from '@/components/common/Icons';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import LogAuthorIntro from '@/components/features/detail-log/LogAuthorIntro';
import LogContent from '@/components/features/detail-log/LogContent';
import LogThubmnail from '@/components/features/detail-log/LogThubmnail';
import { PlaceWithImages } from '@/types/api/log';
import Link from 'next/link';

export interface LogIdParams {
  logId: string;
}
interface LogDetailPageProps {
  params: LogIdParams;
}

const LogDetailPage = async ({ params }: LogDetailPageProps) => {
  const { logId } = await params;
  const result = await fetchLog(logId);
  if (!result.success) {
    throw new Error(result.msg);
  }
  const { data: logData } = result;
  const user = await getUser();
  const isAuthor = user?.user_id === logData.user_id;
  return (
    <div>
      <LogThubmnail logData={logData} isAuthor={isAuthor} />
      <main className="flex flex-col px-4 web:px-[50px]">
        <LogAuthorIntro userId={logData.user_id} logDescription={logData.description ?? ''} />
        {logData.place.map((place: PlaceWithImages, idx: number) => (
          <LogContent key={place.place_id} place={place} idx={idx + 1} />
        ))}
      </main>
      <div className="flex flex-col gap-2 fixed z-10 bottom-10 right-4">
        {isAuthor ? (
          <ExtraActionButton className="w-11 h-11">
            <Link href={`/${logData.log_id}/edit`}>
              <PenBlackIcon />
            </Link>
          </ExtraActionButton>
        ) : (
          <ExtraActionButton className="w-11 h-11" asChild>
            <LogBookMarkButton
              logId={logData.log_id}
              className="rounded-full relative !top-0 !right-0"
            />
          </ExtraActionButton>
        )}
        <ExtraActionButton className="w-11 h-11" asChild>
          <Link href={`/log/${logData.log_id}/placeCollect`}>
            <TableIcon />
          </Link>
        </ExtraActionButton>
      </div>
    </div>
  );
};

export default LogDetailPage;
