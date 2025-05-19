import { ArrowLeftIcon, PenIcon, ShareIcon, WhiteLocationIcon } from '@/components/common/Icons';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import { Badge } from '@/components/ui/badge';
import { DetailLog } from '@/types/api/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';

interface LogThubmnailProps {
  logData: DetailLog;
}
const LogThubmnail = ({ logData }: LogThubmnailProps) => {
  return (
    <section className="relative bg-pink-200 h-[488px] flex flex-col justify-between px-4 web:pl-[50px] pt-4 pb-8">
      <Image
        src={getStoragePublicImage(logData.thumbnail_url as string)}
        alt=""
        fill
        className="object-cover"
      />
      <div className="flex justify-between z-10">
        <ExtraActionButton>
          <ArrowLeftIcon />
        </ExtraActionButton>
        <div className="flex flex-col gap-2">
          <ExtraActionButton>
            <ShareIcon />
          </ExtraActionButton>
          {
            // user &&
            <ExtraActionButton>
              <PenIcon />
            </ExtraActionButton>
          }
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient" />
      <div className="flex flex-col gap-2 z-10">
        <h3 className="text-lg web:text-2xl font-bold text-white">{logData.title}</h3>
        <div className="flex gap-1">
          <Badge className="bg-white/30 px-4 py-1.5 rounded-full">태그</Badge>
          <Badge className="bg-white/30 px-4 py-1.5 rounded-full">
            <WhiteLocationIcon />
            {logData.place.length}
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default LogThubmnail;
