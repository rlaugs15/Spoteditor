'use client';

import useLogs from '@/hooks/queries/log/useLogs';
import Carousel from './Carousel';
import CarouselSkeleton from './CarouselSkeeton';

export default function CarouselContent() {
  const { data, isPending } = useLogs({ pageSize: 12, sort: 'popular' });
  if (isPending) return <CarouselSkeleton />;
  if (data && !data?.success) {
    throw new Error(data.msg);
  }
  return <Carousel logs={data?.data ?? []} />;
}
