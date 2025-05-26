import { logKeys } from '@/app/actions/keys';
import { getLogs } from '@/app/actions/log';
import { getQueryClient } from '@/lib/utils';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import CarouselContent from './CarouselContent';

interface CarouselSectionProps {
  currentPage: number;
}

export default async function CarouselSection({ currentPage }: CarouselSectionProps) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: logKeys.list({ currentPage, pageSize: 12, sort: 'popular' }),
    queryFn: () => getLogs({ currentPage, pageSize: 12, sort: 'popular' }),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarouselContent currentPage={currentPage} />
    </HydrationBoundary>
  );
}
