'use client';
import useLogBookmarkMutation from '@/hooks/mutations/log/useLogBookmarkMutation';
import useLogBookmarkCheck from '@/hooks/queries/log/useLogBookmarkCheck';
import useUser from '@/hooks/queries/user/useUser';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LogBookMarkButtonProps {
  logId: string;
  modal?: boolean;
  className?: string;
}

export default function LogBookMarkButton({ logId, modal, className }: LogBookMarkButtonProps) {
  const router = useRouter();
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data, isLoading } = useLogBookmarkCheck({ logId, userId: user?.user_id || null });
  const { mutate } = useLogBookmarkMutation();

  const onBookMarkClick = () => {
    if (userIsLoading) return;
    if (!user) {
      router.push('/login');
    }
    if (!data) return;
    mutate({ logId, isBookmark: data.isBookmark });
  };
  return (
    <button
      onClick={onBookMarkClick}
      disabled={isLoading}
      className={cn(
        'w-[42px] h-[42px] bg-white flex justify-center items-center absolute top-[10px] web:top-[15px] right-[10px] web:right-[15px] rounded-none border-0',
        modal && 'top-1.5 right-1.5',
        className
      )}
    >
      <Bookmark className={cn('!w-6 !h-6', data?.isBookmark && 'fill-black')} />
    </button>
  );
}
