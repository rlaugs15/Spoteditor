import { placeKeys } from '@/app/actions/keys';
import { BookmarkResponse } from '@/types/api/common';
import { useQuery } from '@tanstack/react-query';
import useUser from '../user/useUser';

interface UseIsPlaceBookmarkProps {
  placeId: string;
  userId: string;
}

async function fetchPlaceBookmarkCheck(placeId: string): Promise<BookmarkResponse> {
  const res = await fetch(`/api/place/bookmark/check?placeId=${placeId}`);
  return res.json();
}

export default function usePlaceBookmarkCheck({ placeId, userId }: UseIsPlaceBookmarkProps) {
  const { data: me } = useUser();
  return useQuery<BookmarkResponse>({
    queryKey: placeKeys.bookmarkStatus(placeId, String(userId)),
    queryFn: () => fetchPlaceBookmarkCheck(placeId),
    enabled: !!me,
  });
}
