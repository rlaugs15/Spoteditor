'use client';

import FollowingButton from '@/components/common/Button/FollowingButton';
import { Button } from '@/components/ui/button';
import { PROFILE_PATHS } from '@/constants/pathname';
import { IUser } from '@/types/api/user';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ProfileActionButtonProps {
  me?: IUser;
  userId: string;
  className?: string;
}

export default function ProfileActionButton({
  me,
  userId,
  className = '',
}: ProfileActionButtonProps) {
  const t = useTranslations('ProfilePage');

  if (!me) return null;

  const isMe = me.user_id === userId;

  return (
    <>
      {isMe ? (
        <Link href={PROFILE_PATHS.EDITOR}>
          <Button variant="outline" className={className}>
            {t('edit')}
          </Button>
        </Link>
      ) : (
        <FollowingButton userId={userId} className={className} />
      )}
    </>
  );
}
