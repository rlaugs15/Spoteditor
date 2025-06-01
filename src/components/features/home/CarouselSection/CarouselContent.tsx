'use client';

import useLogs from '@/hooks/queries/log/useLogs';
import Carousel from './Carousel';

export default function CarouselContent() {
  const { data } = useLogs({ pageSize: 12, sort: 'popular' });
  if (data && !data?.success) {
    throw new Error(data.msg);
  }
  return <Carousel logs={data?.data ?? []} />;
}
