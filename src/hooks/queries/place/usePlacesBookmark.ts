import { placeKeys } from '@/app/actions/keys';
import { toQueryString } from '@/lib/utils';
import { useProfileTabStore } from '@/stores/profileStore';
import { BookmarkParams } from '@/types/api/common';
import { PlacesReseponse } from '@/types/api/place';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchUsePlacesBookmark(params: BookmarkParams): Promise<PlacesReseponse> {
  const query = toQueryString(params);
  const res = await fetch(`/api/places/bookmark?${query}`);
  const data = await res.json();
  return data;
}

export default function usePlacesBookmark({
  userId,
  currentPage = 1,
  pageSize = 12,
}: BookmarkParams) {
  const params = {
    userId,
    currentPage,
    pageSize,
  };
  const tab = useProfileTabStore((state) => state.tab);
  return useQuery({
    queryKey: placeKeys.bookmarkList(params),
    queryFn: () => fetchUsePlacesBookmark(params),
    enabled: !!userId && tab === 'savedSpaces',
    placeholderData: keepPreviousData,
  });
}
