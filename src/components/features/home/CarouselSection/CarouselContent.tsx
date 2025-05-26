'use client';

import { TitledSection } from '@/components/common/SectionBlock';
import useLogs from '@/hooks/queries/log/useLogs';
import useQueryPagination from '@/hooks/useQueryPagination';
import Carousel from './Carousel';

interface CarouselContentProps {
  currentPage: number;
}

export default function CarouselContent({ currentPage }: CarouselContentProps) {
  const { handlePageChange } = useQueryPagination('popularityPage', currentPage);
  const { data } = useLogs({ currentPage, pageSize: 12, sort: 'popular' });

  /* 토탈 아이템을 초과할 때 처음으로 */
  const nextPage = currentPage + 1;
  const hasNextPage = nextPage <= (data?.meta?.pagination?.totalPages ?? 1);
  return (
    <TitledSection title="Latest" subTitle="Log">
      <Carousel
        logs={data}
        onReachEnd={() => {
          if (hasNextPage) handlePageChange(nextPage);
        }}
      />
    </TitledSection>
  );
}
