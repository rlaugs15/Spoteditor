import { cn } from '@/lib/utils';
import Image from 'next/image';

interface UserImageProps {
  imgSrc: string | null;
  className?: string;
}

export default function UserImage({ imgSrc, className }: UserImageProps) {
  return (
    <div
      className={cn('relative rounded-full overflow-hidden', className ? className : 'w-15 h-15')}
    >
      <Image
        src={imgSrc && imgSrc !== 'null' ? imgSrc : '/profile/user-default-avatar.webp'}
        fill
        sizes="60px"
        alt="유저 프로필 이미지"
        className="object-cover object-center"
      />
    </div>
  );
}
