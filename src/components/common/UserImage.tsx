import { cn } from '@/lib/utils';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image, { ImageProps } from 'next/image';

interface UserImageProps extends Omit<ImageProps, 'src' | 'alt' | 'fill'> {
  imgSrc: string | null;
  className?: string;
}

function isBlobUrl(url: string) {
  return url.startsWith('blob:') || url.startsWith('data:');
}

export default function UserImage({ imgSrc, className, ...props }: UserImageProps) {
  const finalSrc =
    imgSrc && imgSrc !== 'null'
      ? isBlobUrl(imgSrc) // blob URL이거나 data URL인 경우 그대로 사용
        ? imgSrc
        : getStoragePublicImage(imgSrc) // 일반 Supabase 경로는 변환
      : '/profile/user-default-avatar.webp';
  return (
    <div
      className={cn('relative rounded-full overflow-hidden', className ? className : 'w-15 h-15')}
    >
      <Image
        src={finalSrc}
        fill
        sizes="60px"
        alt="유저 프로필 이미지"
        className="object-cover object-center"
        quality={100}
        {...props}
      />
    </div>
  );
}
