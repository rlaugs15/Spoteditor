'use client';

import { Button } from '@/components/ui/button';
import useFollowMutation from '@/hooks/mutations/follow/userFollowMutation';
import useIsFollowing from '@/hooks/queries/follow/useIsFollowing';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface FollowingButtonProps {
  userId: string;
  className?: string;
}

export default function FollowingButton({ userId, className = '' }: FollowingButtonProps) {
  const t = useTranslations('Follow');

  const { data: followStatus, isPending } = useIsFollowing(userId);
  const isFollowing = followStatus?.isFollowing ?? false;

  const { mutate, isPending: isMutating } = useFollowMutation();

  const onFollowClick = () => {
    if (isMutating || isPending) return;
    mutate(
      { userId, isFollowing }
      /* {
        onSuccess: async () => {
          await revalidatePublicUser(userId);
        },
      } */
    );
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={'ghost'}
      size="s"
      className={cn(
        'text-xs rounded-full bg-gray-50 border',
        className,
        isFollowing
          ? 'bg-black hover:bg-black hover:text-white text-white'
          : 'bg-white border-light-100'
      )}
    >
      {isFollowing ? t('button.following') : t('button.follow')}
    </Button>
  );
}
