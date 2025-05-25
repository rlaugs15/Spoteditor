'use client';

import usePlaceBookmarkMutation from '@/hooks/mutations/place/usePlaceBookmarkMutation';
import usePlaceBookmarkCheck from '@/hooks/queries/place/useIsPlaceBookmarkCheck';
import useUser from '@/hooks/queries/user/useUser';
import { cn } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PlaceBookMarkButtonProps {
  placeId: string;
}

export default function PlaceBookMarkButton({ placeId }: PlaceBookMarkButtonProps) {
  const router = useRouter();
  const { data: user, isLoading: userIsLoading } = useUser();
  const { data, isLoading } = usePlaceBookmarkCheck({ placeId, userId: String(user?.user_id) });
  const { mutate } = usePlaceBookmarkMutation();

  const onBookMarkClick = () => {
    if (userIsLoading) return;
    if (!user) {
      router.push('/login');
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
      className=" hover:cursor-pointer w-[42px] h-[42px] bg-white flex p-[6px] justify-center items-center absolute top-[15px] right-[15px]"
    >
      <div className="w-10.5 h-10.5 flex justify-center items-center">
        <Bookmark className={cn(data?.isBookmark && 'fill-black')} />
      </div>
    </button>
  );
}
