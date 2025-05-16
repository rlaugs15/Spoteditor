import { logKeys } from '@/app/actions/keys';
import { BookmarkResponse } from '@/types/api/common';
import { useQuery } from '@tanstack/react-query';

interface UseIsLogBookmarkProps {
  logId: string;
  userId: string;
}

async function fetchIsLogBookmark(logId: string): Promise<BookmarkResponse> {
  const res = await fetch(`/api/log/bookmark?logId=${logId}`);
  return res.json();
}

export default function useIsLogBookmark({ logId, userId }: UseIsLogBookmarkProps) {
  return useQuery<BookmarkResponse>({
    queryKey: logKeys.bookmarkStatus(logId, String(userId)),
    queryFn: () => fetchIsLogBookmark(logId),
    enabled: !!logId && !!userId,
  });
}
