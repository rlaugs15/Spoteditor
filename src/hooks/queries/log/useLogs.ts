import { logKeys } from '@/app/actions/keys';
import { LogsParams, LogsReseponse } from '@/types/api/log';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

async function fetchUseLogs({ userId, currentPage, pageSize }: LogsParams): Promise<LogsReseponse> {
  const res = await fetch(
    `/api/logs?userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

export default function useLogs({ userId, currentPage = 1, pageSize = 10 }: LogsParams) {
  const params = {
    userId,
    currentPage,
    pageSize,
  };
  return useQuery({
    queryKey: userId ? logKeys.listByUser(params) : logKeys.list(params),
    queryFn: () => fetchUseLogs(params),
    placeholderData: keepPreviousData,
  });
}
