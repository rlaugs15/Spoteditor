import { getLog } from '@/app/actions/log';
import { getUser } from '@/app/actions/user';
import LogAuthorIntro from '@/components/features/detail-log/LogAuthorIntro';
import LogContent from '@/components/features/detail-log/LogContent';
import LogDetailActions from '@/components/features/detail-log/LogDetailActions';
import LogThumbnail from '@/components/features/detail-log/LogThumbnail';
import { notFound } from 'next/navigation';
export interface LogIdParams {
  logId: string;
}
interface LogDetailPageProps {
  params: Promise<LogIdParams>;
}

const LogDetailPage = async ({ params }: LogDetailPageProps) => {
  const { logId } = await params;
  const result = await getLog(logId);
  if (!result.success) {
    notFound();
  }
  const { data: logData } = result;
  const user = await getUser();
  const isAuthor = user?.user_id === logData.user_id;

  return (
    <div>
      <LogThumbnail logData={logData} isAuthor={isAuthor} />
      <main className="flex flex-col px-4 web:px-[50px] pb-[200px]">
        <LogAuthorIntro
          userId={logData.user_id}
          userNickname={String(logData.users.nickname)}
          userImgUrl={String(logData.users.image_url)}
        />
        <>
          {logData.place.map((place, idx) => (
            <LogContent key={place.log_id} place={place} idx={idx + 1} />
          ))}
        </>
      </main>

      <LogDetailActions
        isAuthor={isAuthor}
        logId={logId}
        logBookmarkCount={Number(logData._count?.log_bookmark)}
      />
    </div>
  );
};

export default LogDetailPage;
