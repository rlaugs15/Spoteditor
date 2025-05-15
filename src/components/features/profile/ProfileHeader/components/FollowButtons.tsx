'use client';

import { Separator } from '@/components/ui/separator';
import FollowerListButton from './FollowerListButton';
import usePublicUser from '@/hooks/queries/user/usePublicUser';

interface FollowButtonsProps {
  userId: string;
}

export default function FollowButtons({ userId }: FollowButtonsProps) {
  const { data: user } = usePublicUser(userId);
  return (
    <>
      <FollowerListButton userId={userId} totalCount={user?.followerCount ?? 0} />
      <div className="flex items-center">
        <Separator orientation="vertical" className="h-3 bg-light-300" />
      </div>
      {/*  <FollowingListButton isMe={isMe} otherUserId={Number(userId)} count={data?.following || 0} /> */}
    </>
  );
}
