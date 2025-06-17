import PlaceBookMarkButton from '@/components/common/Button/Bookmark/PlaceBookMarkButton';
import { LocationIcon, MapIcon } from '@/components/common/Icons';
import { DetailLog } from '@/types/api/log';
import PlaceImageSlider from './PlaceImageSlider';

interface LogContentProps {
  place: DetailLog['place'][number];
  idx: number;
}

const LogContent = ({ place, idx }: LogContentProps) => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] border-t pt-[15px] web:pt-3 py-10 space-y-[15px]">
      <section className="flex flex-col gap-2 relative">
        <div className="flex justify-between">
          <div className="text-text-lg web:text-text-2xl font-bold flex flex-col">
            <span>{String(idx).padStart(2, '0')}</span>
            <span>{place.name}</span>
          </div>
          <PlaceBookMarkButton placeId={place.place_id} className="!top-0 !right-0" />
        </div>
        <div>
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <MapIcon />
            <span>{place.category}</span>
          </div>
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <LocationIcon />
            <span>{place.address}</span>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <PlaceImageSlider placeImages={place.place_images} />
        <pre className="text-text-sm web:text-text-lg text-light-400 pre">
          {place.description || ''}
        </pre>
      </section>
    </div>
  );
};

export default LogContent;
