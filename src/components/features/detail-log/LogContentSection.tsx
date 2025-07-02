'use client';

import useLog from '@/hooks/queries/log/useLog';
import LogContent from './LogContent';

interface LogContentSectionProps {
  logId: string;
}

export default function LogContentSection({ logId }: LogContentSectionProps) {
  const { data } = useLog(logId, {enabled: !!logId});

  if (!data?.success) return null;

  return (
    <>
      {data.data.place.map((place, idx) => (
        <LogContent key={place.place_id} place={place} idx={idx + 1} />
      ))}
    </>
  );
}
