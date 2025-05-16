import { placeKeys } from '@/app/actions/keys';
import { BookmarkResponse } from '@/types/api/common';
import { useQuery } from '@tanstack/react-query';

interface UseIsPlaceBookmarkProps {
  placeId: string;
  userId: string;
}

async function fetchIsPlaceBookmark(placeId: string): Promise<BookmarkResponse> {
  const res = await fetch(`/api/place/bookmark?placeId=${placeId}`);
  return res.json();
}

export default function useIsPlaceBookmark({ placeId, userId }: UseIsPlaceBookmarkProps) {
  return useQuery<BookmarkResponse>({
    queryKey: placeKeys.bookmarkStatus(placeId, String(userId)),
    queryFn: () => fetchIsPlaceBookmark(placeId),
    enabled: !!placeId && !!userId,
  });
}
