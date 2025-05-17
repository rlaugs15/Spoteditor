import { logKeys } from '@/app/actions/keys';
import { BookmarkParams } from '@/types/api/common';
import { LogReseponse } from '@/types/api/log';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchUseLogsBookmark({
  userId,
  currentPage,
  pageSize,
}: BookmarkParams): Promise<LogReseponse> {
  const res = await fetch(
    `/api/logs/bookmark?userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

export default function useLogsBookmark({
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
    queryKey: logKeys.bookmarkList(params),
    queryFn: () => fetchUseLogsBookmark(params),
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
}
