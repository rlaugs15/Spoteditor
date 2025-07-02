'use client';

import FallbackMessage from '@/components/common/FallbackMessage';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import useLogs from '@/hooks/queries/log/useLogs';
import Carousel from './Carousel';
import CarouselSkeleton from './CarouselSkeleton';

interface CarouselContentProps {
  currentPage: number;
}

export default function CarouselContent({ currentPage }: CarouselContentProps) {
  const { data, isPending } = useLogs({ currentPage, pageSize: 12, sort: 'popular' });
  if (isPending) return <CarouselSkeleton />;

  if ((data && !data?.success) || data?.data.length === 0) {
    return (
      <FallbackMessage
        message={
          !data.success
            ? ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR
            : ERROR_MESSAGES.LOG.LIST_EMPTY
        }
        className="items-center"
      />
    );
  }

  return <Carousel logs={data?.data ?? []} />;
}
