import { logKeys } from '@/app/actions/keys';
import { BookmarkResponse } from '@/types/api/common';
import { useQuery } from '@tanstack/react-query';

interface UseLogBookmarkCheckProps {
  logId: string;
  userId: string;
}

async function fetchLogBookmarkCheck(logId: string): Promise<BookmarkResponse> {
  const res = await fetch(`/api/log/bookmark/check?logId=${logId}`);
  return res.json();
}

export default function useLogBookmarkCheck({ logId, userId }: UseLogBookmarkCheckProps) {
  return useQuery<BookmarkResponse>({
    queryKey: logKeys.bookmarkStatus(logId, String(userId)),
    queryFn: () => fetchLogBookmarkCheck(logId),
    enabled: false, //!!logId && !!userId,
  });
}
