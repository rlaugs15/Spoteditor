import { searchKeys } from '@/app/actions/keys';
import { SearchParams, SearchReseponse } from '@/types/api/search';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchuseSearch({
  keyword,
  currentPage,
  pageSize = 10,
}: SearchParams): Promise<SearchReseponse> {
  const res = await fetch(
    `/api/v1/search?keyword=${keyword}&currentPage=${currentPage}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

export default function useSearch(params: SearchParams) {
  return useQuery({
    queryKey: searchKeys.list(params),
    queryFn: () => fetchuseSearch(params),
    placeholderData: keepPreviousData,
  });
}

//() => getSearch(params),
