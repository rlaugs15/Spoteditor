import { logKeys } from '@/app/actions/keys';
import { ApiResponse } from '@/types/api/common';
import { DetailLog } from '@/types/api/log';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

async function fetchUseLog(logId: string): Promise<ApiResponse<DetailLog>> {
  const res = await fetch(`/api/log?logId=${logId}`);
  const data = await res.json();
  return data;
}

export default function useLog(
  logId: string,
  options?: Partial<UseQueryOptions<ApiResponse<DetailLog>, Error>>
) {
  return useQuery({
    queryKey: logKeys.detail(logId),
    queryFn: () => fetchUseLog(logId),
    ...options,
  });
}
