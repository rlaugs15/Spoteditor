'use client';

import { LocationIcon, MapIcon } from '@/components/common/Icons';
import { DetailLog } from '@/types/api/log';
import { useTranslations } from 'next-intl';
import PlaceBookmarkWithCount from './PlaceBookmarkWithCount';
import PlaceImageSlider from './PlaceImageSlider';

interface LogContentProps {
  place: DetailLog['place'][number];
  idx: number;
}

const LogContent = ({ place, idx }: LogContentProps) => {
  const t = useTranslations('Category');

  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] border-t pt-[15px] web:pt-3 py-10 space-y-[15px]">
      <section className="flex flex-col gap-2 relative">
        <div className="flex justify-between">
          <div className="text-text-lg web:text-text-2xl font-bold flex flex-col">
            <span>{String(idx).padStart(2, '0')}</span>
            <span>{place.name}</span>
          </div>
          <PlaceBookmarkWithCount
            placeId={place.place_id}
            placeBookmarkCount={Number(place._count?.place_bookmark)}
          />
        </div>
        <div className="flex flex-col web:w-[324px] gap-[2px]">
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg items-center">
            <MapIcon className="w-4.5 h-4.5" />
            <span className="break-words block min-w-0">{t(`${place.category}`)}</span>
          </div>
          <div className="flex items-start gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <LocationIcon className="w-4.5 h-4.5 flex-shrink-0 mt-[4px]" />
            <span className="break-words block min-w-0 mt-[1.5px] web:mt-0">{place.address}</span>
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
