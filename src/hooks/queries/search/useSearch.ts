import { searchKeys } from '@/app/actions/keys';
import { getSearch } from '@/app/actions/search';
import { SearchParams } from '@/types/api/search';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export default function useSearch(params: SearchParams) {
  return useQuery({
    queryKey: searchKeys.list(params),
    queryFn: () => getSearch(params),
    placeholderData: keepPreviousData,
  });
}
