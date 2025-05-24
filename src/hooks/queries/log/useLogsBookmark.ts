import { logKeys } from '@/app/actions/keys';
import { toQueryString } from '@/lib/utils';
import { useProfileTabStore } from '@/stores/profileStore';
import { BookmarkParams } from '@/types/api/common';
import { LogsReseponse } from '@/types/api/log';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchUseLogsBookmark(params: BookmarkParams): Promise<LogsReseponse> {
  const query = toQueryString(params);
  const res = await fetch(`/api/logs/bookmark?${query}`);
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
  const tab = useProfileTabStore((state) => state.tab);
  return useQuery({
    queryKey: logKeys.bookmarkList(params),
    queryFn: () => fetchUseLogsBookmark(params),
    enabled: !!userId && tab === 'savedLog',
    placeholderData: keepPreviousData,
  });
}
