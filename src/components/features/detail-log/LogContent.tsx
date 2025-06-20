'use client';

import PlaceBookMarkButton from '@/components/common/Button/Bookmark/PlaceBookMarkButton';
import { LocationIcon, MapIcon } from '@/components/common/Icons';
import { formatCount } from '@/lib/utils';
import { DetailLog } from '@/types/api/log';
import { useState } from 'react';
import PlaceImageSlider from './PlaceImageSlider';

interface LogContentProps {
  place: DetailLog['place'][number];
  idx: number;
}

const LogContent = ({ place, idx }: LogContentProps) => {
  const [bookmarkCount, setBookmarkCount] = useState(place._count?.place_bookmark ?? 0);
  const handleToggleBookmark = (newStatus: boolean) => {
    setBookmarkCount((prev) => prev + (newStatus ? 1 : -1));
  };
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] border-t pt-[15px] web:pt-3 py-10 space-y-[15px]">
      <section className="flex flex-col gap-2 relative">
        <div className="flex justify-between">
          <div className="text-text-lg web:text-text-2xl font-bold flex flex-col">
            <span>{String(idx).padStart(2, '0')}</span>
            <span>{place.name}</span>
          </div>
          <section className="absolute top-0 right-0 flex flex-col items-center">
            <PlaceBookMarkButton
              placeId={place.place_id}
              onToggle={handleToggleBookmark}
              className="!top-0 !right-0 !relative w-9 h-9"
            />
            <span className="font-medium text-text-sm text-light-300">
              {formatCount(bookmarkCount)}
            </span>
          </section>
        </div>
        <div className="flex flex-col web:w-[324px] gap-[2px]">
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <MapIcon className="w-4.5 h-4.5 mt-1" />
            <span className="break-words block min-w-0">{place.category}</span>
          </div>
          <div className="flex items-start gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <LocationIcon className="w-4.5 h-4.5 mt-1 flex-shrink-0" />
            <span className="break-words block min-w-0">{place.address}</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <PlaceImageSlider placeImages={place.place_images} />
        {place.description && (
          <pre className="text-text-sm web:text-text-lg text-light-400 pre">
            {place.description}
          </pre>
        )}
      </section>
    </div>
  );
};

export default LogContent;
