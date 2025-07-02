'use client';

import UserImage from '@/components/common/UserImage';
import { PROFILE_PATHS } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';

interface LogProfileLinkProps {
  userId: string;
  userImage: string;
  userNickname: string;
}

export default function LogProfileLink({ userId, userImage, userNickname }: LogProfileLinkProps) {
  return (
    <Link href={`${PROFILE_PATHS.PROFILE}/${userId}`} className="flex items-center gap-2">
      <UserImage imgSrc={userImage} className="w-6 h-6" />
      <span className="text-text-sm web:text-text-md font-semibold">{userNickname}</span>
    </Link>
  );
}
