import { logKeys } from '@/app/actions/keys';
import { getLog } from '@/app/actions/log';
import { getUser } from '@/app/actions/user';
import LogAuthorIntro from '@/components/features/detail-log/LogAuthorIntro';
import LogContentSection from '@/components/features/detail-log/LogContentSection';
import LogDetailActions from '@/components/features/detail-log/LogDetailActions';
import LogThumbnail from '@/components/features/detail-log/LogThumbnail';
import { getQueryClient } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
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

  const queryClient = getQueryClient();

  //queryClient.setQueryData(logKeys.detail(logId), result);

  await queryClient.prefetchQuery({
    queryKey: logKeys.detail(logId),
    queryFn: () => getLog(logId),
  });
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div>
        <LogThumbnail logData={logData} isAuthor={isAuthor} />
        <main className="flex flex-col px-4 web:px-[50px] pb-[200px]">
          <LogAuthorIntro
            userId={logData.user_id}
            userNickname={String(logData.users.nickname)}
            userImgUrl={String(logData.users.image_url)}
          />
          <LogContentSection logId={logId} />
        </main>

        <LogDetailActions isAuthor={isAuthor} logId={logId} />
      </div>
    </HydrationBoundary>
  );
};

export default LogDetailPage;
