import { placeKeys } from '@/app/actions/keys';
import { BookmarkParams } from '@/types/api/common';
import { PlaceReseponse } from '@/types/api/place';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchUsePlacesBookmark({
  userId,
  currentPage,
  pageSize,
}: BookmarkParams): Promise<PlaceReseponse> {
  const res = await fetch(
    `/api/places/bookmark?userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

export default function usePlacesBookmark({
  userId,
  currentPage = 1,
  pageSize = 10,
}: BookmarkParams) {
  const params = {
    userId,
    currentPage,
    pageSize,
  };
  return useQuery({
    queryKey: placeKeys.bookmarkList(params),
    queryFn: () => fetchUsePlacesBookmark(params),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
}
