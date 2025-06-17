'use client';
import usePlaceBookmarkMutation from '@/hooks/mutations/place/usePlaceBookmarkMutation';
import usePlaceBookmarkCheck from '@/hooks/queries/place/useIsPlaceBookmarkCheck';
import useUser from '@/hooks/queries/user/useUser';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PlaceBookMarkButtonProps {
  placeId: string;
  modal?: boolean;
  className?: string;
  onToggle?: (isBookmarked: boolean) => void;
}

export default function PlaceBookMarkButton({
  placeId,
  modal,
  className,
  onToggle,
}: PlaceBookMarkButtonProps) {
  const router = useRouter();
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data, isLoading } = usePlaceBookmarkCheck({ placeId, userId: user?.user_id || null });
  const { mutate } = usePlaceBookmarkMutation(onToggle);

  const onBookMarkClick = () => {
    if (userIsLoading) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (!data) return;
    mutate({
      placeId,
      isBookmark: data.isBookmark,
    });
  };
  return (
    <button
      onClick={onBookMarkClick}
      disabled={isLoading}
      className={cn(
        'w-[42px] h-[42px] bg-white flex justify-center items-center absolute top-[10px] web:top-[15px] right-[10px] web:right-[15px] rounded-none border-0 hover:brightness-85',
        modal && '!top-1.5 !right-1.5',
        className
      )}
    >
      <Bookmark className={cn('!w-6 !h-6', data?.isBookmark && 'fill-black')} />
    </button>
  );
}
