'use client';

import { cn } from '@/lib/utils';
import { getStoragePublicImage } from '@/utils/getStorageImage';
import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

interface UserImageProps extends Omit<ImageProps, 'src' | 'alt' | 'fill'> {
  imgSrc: string | null;
  className?: string;
}

function isBlobUrl(url: string) {
  return url.startsWith('blob:') || url.startsWith('data:');
}
function isAbsoluteUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://');
}

export default function UserImage({ imgSrc, className, ...props }: UserImageProps) {
  const [errored, setErrored] = useState(false);

  const isValidImgSrc = imgSrc && imgSrc !== 'null' && imgSrc !== '';

  const finalSrc =
    !errored && isValidImgSrc
      ? isBlobUrl(imgSrc) || isAbsoluteUrl(imgSrc) // 이미 절대 URL이면 그대로 사용
        ? imgSrc
        : getStoragePublicImage(imgSrc) // 수파베이스 상대경로면 변환
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
        onError={() => setErrored(true)}
        {...props}
      />
    </div>
  );
}
