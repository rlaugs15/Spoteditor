'use client';

import PlaceBookMarkButton from '@/components/common/Button/Bookmark/PlaceBookMarkButton';
import { formatCount } from '@/lib/utils';
import { useState } from 'react';

interface PlaceBookmarkWithCountProps {
  placeId: string;
  placeBookmarkCount: number;
}

export default function PlaceBookmarkWithCount({
  placeId,
  placeBookmarkCount = 0,
}: PlaceBookmarkWithCountProps) {
  const [bookmarkCount, setBookmarkCount] = useState(placeBookmarkCount);

  const handleToggle = (newStatus: boolean) => {
    setBookmarkCount((prev) => prev + (newStatus ? 1 : -1));
  };
  return (
    <section className="absolute top-0 right-0 flex flex-col items-center">
      <PlaceBookMarkButton
        placeId={placeId}
        onToggle={handleToggle}
        className="!top-0 !right-0 !relative w-9 h-9"
      />
      <span className="font-medium text-text-sm text-light-300">{formatCount(bookmarkCount)}</span>
    </section>
  );
}
