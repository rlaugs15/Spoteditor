import { searchKeys } from '@/app/actions/keys';
import { toQueryString } from '@/lib/utils';
import { SearchParams, SearchResponse } from '@/types/api/search';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchuseSearch(params: SearchParams): Promise<SearchResponse> {
  const query = toQueryString(params);
  const res = await fetch(`/api/logs/search?${query}`);
  const data = await res.json();
  return data;
}

export default function useSearchLogs(params: SearchParams) {
  return useQuery({
    queryKey: searchKeys.list(params),
    queryFn: () => fetchuseSearch(params),
    placeholderData: keepPreviousData,
    enabled: (params.keyword ?? '').length > 0, // 검색어가 있을 때만
  });
}

//() => getSearch(params),
