import { placeKeys } from '@/app/actions/keys';
import { getPlaces } from '@/app/actions/place';
import { getQueryClient } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import LatestPlaceContent from './LatestPlaceContent';

interface LatestPlaceContentSectionProps {
  currentPage: number;
}

export default async function LatestPlaceContentSection({
  currentPage,
}: LatestPlaceContentSectionProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: placeKeys.list({ currentPage, pageSize: 12, sort: 'latest' }),
    queryFn: () => getPlaces({ currentPage, pageSize: 12, sort: 'latest' }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LatestPlaceContent currentPage={currentPage} />
    </HydrationBoundary>
  );
}
