import { logKeys } from '@/app/actions/keys';
import { getLogs } from '@/app/actions/log';
import { getQueryClient } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import LatestLogContent from './LatestLogContent';

interface LatestLogContentSectionProps {
  currentPage: number;
}

export default async function LatestLogContentSection({
  currentPage,
}: LatestLogContentSectionProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: logKeys.list({ currentPage: currentPage, pageSize: 13, sort: 'latest' }),
    queryFn: () => getLogs({ currentPage: currentPage, pageSize: 13, sort: 'latest' }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LatestLogContent currentPage={currentPage} />
    </HydrationBoundary>
  );
}
