import { Button } from '@/components/ui/button';
import useFollowMutation from '@/hooks/mutations/follow/userFollowMutation';
import useIsFollowing from '@/hooks/queries/follow/useIsFollowing';
import { cn } from '@/lib/utils';

interface FollowingButtonProps {
  userId: string;
  className?: string;
}

export default function FollowingButton({ userId, className = '' }: FollowingButtonProps) {
  const { data: followStatus, isPending } = useIsFollowing(userId);
  const isFollowing = followStatus?.isFollowing ?? false;

  const { mutate, isPending: isMutating } = useFollowMutation();

  const onFollowClick = () => {
    if (isMutating || isPending) return;

    mutate({ userId, isFollowing });
  };

  return (
    <Button
      onClick={onFollowClick}
      variant={isFollowing ? 'ghost' : 'outline'}
      size="s"
      className={cn('font-medium rounded-[60px]', className)}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </Button>
  );
}
