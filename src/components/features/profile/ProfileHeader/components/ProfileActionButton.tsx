import FollowingButton from '@/components/common/Button/FollowingButton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProfileActionButtonProps {
  isMe: boolean;
  userId: string;
  className?: string;
}

export default function ProfileActionButton({
  isMe,
  userId,
  className = '',
}: ProfileActionButtonProps) {
  if (isMe) {
    return (
      <Link href="/profile/editor">
        <Button variant="outline" className={className}>
          편집
        </Button>
      </Link>
    );
  }

  return <FollowingButton userId={userId} className={className} />;
}
