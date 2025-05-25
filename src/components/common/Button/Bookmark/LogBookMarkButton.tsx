'use client';

import useLogBookmarkMutation from '@/hooks/mutations/log/useLogBookmarkMutation';
import useLogBookmarkCheck from '@/hooks/queries/log/useLogBookmarkCheck';
import useUser from '@/hooks/queries/user/useUser';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LogBookMarkButtonProps {
  logId: string;
}

export default function LogBookMarkButton({ logId }: LogBookMarkButtonProps) {
  const router = useRouter();
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data, isLoading } = useLogBookmarkCheck({ logId, userId: String(user?.user_id) });
  const { mutate } = useLogBookmarkMutation();

  const onBookMarkClick = () => {
    if (userIsLoading) return;
    if (!user) {
      router.push('/login');
    }
    if (!data) return;
    mutate({
      logId,
      isBookmark: data.isBookmark,
    });
  };
  return (
    <button
      onClick={onBookMarkClick}
      disabled={isLoading}
      className=" hover:cursor-pointer w-[42px] h-[42px] bg-white flex p-[6px] justify-center items-center absolute top-[15px] right-[15px]"
    >
      <div className="w-10.5 h-10.5 flex justify-center items-center">
        <Bookmark className={cn(data?.isBookmark && 'fill-black')} />
      </div>
    </button>
  );
}
