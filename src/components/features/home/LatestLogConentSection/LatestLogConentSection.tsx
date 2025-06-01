import { logKeys } from '@/app/actions/keys';
import { getLogs } from '@/app/actions/log';
import { getQueryClient } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import LatestLogConent from './LatestLogConent';

interface LatestLogConentSectionProps {
  currentPage: number;
}

export default async function LatestLogConentSection({ currentPage }: LatestLogConentSectionProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: logKeys.list({ currentPage: currentPage, pageSize: 13 }),
    queryFn: () => getLogs({ currentPage: currentPage, pageSize: 13 }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LatestLogConent currentPage={currentPage} />
    </HydrationBoundary>
  );
}
