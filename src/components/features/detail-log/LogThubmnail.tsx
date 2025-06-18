import BackButton from '@/components/common/Button/BackButton';
import ClipboardButton from '@/components/common/Button/ClipboardButton';
import { PenIcon, WhiteLocationIcon } from '@/components/common/Icons';
import ExtraActionButton from '@/components/features/detail-log/ExtraActionButton';
import { Badge } from '@/components/ui/badge';
import { DetailLog } from '@/types/api/log';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image from 'next/image';
import Link from 'next/link';
import TagRow from './TagRow';

interface LogThubmnailProps {
  logData: DetailLog;
  isAuthor: boolean;
}
const LogThubmnail = ({ logData, isAuthor }: LogThubmnailProps) => {
  const { thumbnail_url, title, place, log_tag } = logData;
  const moods = log_tag.filter((item) => item.category === 'mood');
  const activities = log_tag.filter((item) => item.category === 'activity');
  return (
    <section className="relative h-[488px] flex flex-col justify-between px-4 web:px-[50px] pt-4 pb-8">
      <Image
        src={getStoragePublicImage(thumbnail_url as string)}
        alt="로그 썸네일 이미지"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-cover-gradient" />

      {/* 버튼 */}
      <section className="flex justify-between z-10">
        <ExtraActionButton asChild>
          <BackButton circle />
        </ExtraActionButton>

        <div className="flex flex-col gap-2">
          <ClipboardButton />
          {isAuthor && (
            <ExtraActionButton>
              <Link href={`/${logData.log_id}/edit`}>
                <PenIcon />
              </Link>
            </ExtraActionButton>
          )}
        </div>
      </section>

      {/* 태그 */}
      <section className="flex flex-col z-10">
        <h3 className="text-lg web:text-2xl font-bold text-white">{title}</h3>
        <div className="flex flex-col gap-1">
          {/* mood */}
          <div className="flex gap-1">
            <Badge className="bg-white/30 px-4 py-1.5 rounded-full">
              <WhiteLocationIcon />
              {place.length}
            </Badge>
            <TagRow items={moods} />
          </div>
          {/* activity */}
          <TagRow items={activities} />
        </div>
      </section>
    </section>
  );
};

export default LogThubmnail;
