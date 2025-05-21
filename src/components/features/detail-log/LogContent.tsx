import { BookMarkIcon, ClockIcon, LocationIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { DetailLog } from '@/types/api/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';

interface LogContentProps {
  place: DetailLog['place'][number];
  idx: number;
}

const LogContent = ({ place, idx }: LogContentProps) => {
  return (
    <div className="web:grid grid-cols-[1fr_4fr] gap-[15px] border-t pt-[15px] web:pt-3 py-10 space-y-[15px]">
      <section className="flex flex-col gap-2 relative">
        <div className="text-text-lg web:text-text-2xl font-bold flex flex-col">
          <span>{String(idx).padStart(2, '0')}</span>
          <span>{place.name}</span>
        </div>
        <div>
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <ClockIcon />
            <span>{place.category}</span>
          </div>
          <div className="flex gap-1.5 text-light-400 text-text-sm web:text-text-lg">
            <LocationIcon />
            <span>{place.address}</span>
          </div>
        </div>
        <Button variant={'ghost'} size={'icon'} className="absolute right-0">
          <BookMarkIcon />
        </Button>
      </section>

      <section className="flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-[15px] h-[424px]">
          {place.place_images
            .sort((a, b) => a.order - b.order)
            .map((img) => (
              <div key={img.place_image_id} className="relative w-full h-full">
                <Image
                  src={getStoragePublicImage(img.image_path as string)}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            ))}
        </div>
        <pre className="text-text-sm web:text-text-lg text-light-400 pre">
          {place.description || ''}
        </pre>
      </section>
    </div>
  );
};

export default LogContent;
