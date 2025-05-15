import { cn } from '@/lib/utils';
import Image from 'next/image';
import userDefaultAvatar from '@/app/assets/profile/user-default-avatar.webp';

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
        src={imgSrc && imgSrc !== 'null' ? imgSrc : userDefaultAvatar}
        fill
        sizes="60px"
        alt="유저 프로필 이미지"
        className="object-cover object-center"
      />
    </div>
  );
}
