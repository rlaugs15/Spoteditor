import { placeKeys } from '@/app/actions/keys';
import { BookmarkResponse } from '@/types/api/common';
import { useQuery } from '@tanstack/react-query';

interface UseIsPlaceBookmarkProps {
  placeId: string;
  userId: string | null;
}

async function fetchPlaceBookmarkCheck(placeId: string): Promise<BookmarkResponse> {
  const res = await fetch(`/api/place/bookmark/check?placeId=${placeId}`);
  return res.json();
}

export default function usePlaceBookmarkCheck({ placeId, userId }: UseIsPlaceBookmarkProps) {
  return useQuery<BookmarkResponse>({
    queryKey: placeKeys.bookmarkStatus(placeId, String(userId)),
    queryFn: () => fetchPlaceBookmarkCheck(placeId),
    enabled: !!userId,
  });
}
