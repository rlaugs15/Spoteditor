'use client';

import useLogs from '@/hooks/queries/log/useLogs';
import Carousel from './Carousel';

export default function CarouselContent() {
  const { data } = useLogs({ pageSize: 12, sort: 'popular' });
  return <Carousel logs={data?.data ?? []} />;
}
