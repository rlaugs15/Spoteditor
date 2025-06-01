'use client';

import { Separator } from '@/components/ui/separator';
import usePublicUser from '@/hooks/queries/user/usePublicUser';
import { IUser } from '@/types/api/user';
import FollowerListButton from './FollowerListButton';
import FollowingListButton from './FollowingListButton';

interface FollowButtonsProps {
  userId: string;
  me: IUser;
}

export default function FollowButtons({ userId, me }: FollowButtonsProps) {
  const { data: user } = usePublicUser(userId);
  return (
    <>
      <FollowerListButton userId={userId} totalCount={user?.followerCount ?? 0} />
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-3 bg-light-300" />
      </div>
      <FollowingListButton me={me} userId={userId} totalCount={user?.followingCount ?? 0} />
    </>
  );
}
