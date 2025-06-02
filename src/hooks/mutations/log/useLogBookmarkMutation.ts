import { logKeys } from '@/app/actions/keys';
import useUser from '@/hooks/queries/user/useUser';
import { BookmarkResponse } from '@/types/api/common';
import { LogBookmarkCheckParams } from '@/types/api/log';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchLogBookmark({
  logId,
  isBookmark,
}: LogBookmarkCheckParams): Promise<BookmarkResponse> {
  const res = await fetch(`/api/log/bookmark/check?logId=${logId}`, {
    method: isBookmark ? 'DELETE' : 'POST',
  });
  const data = await res.json();
  return data;
}
export default function useLogBookmarkMutation() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchLogBookmark,
    onMutate: async ({ logId, isBookmark }: LogBookmarkCheckParams) => {
      await queryClient.cancelQueries({
        queryKey: logKeys.bookmarkStatus(logId, String(user?.user_id)),
      });

      const previousbookmarkStatus = queryClient.getQueryData(
        logKeys.bookmarkStatus(logId, String(user?.user_id))
      );

      queryClient.setQueryData(
        logKeys.bookmarkStatus(logId, String(user?.user_id)),
        (old: BookmarkResponse) => ({
          ...old,
          isBookmark: !isBookmark,
        })
      );

      return { previousbookmarkStatus };
    },
    onError: (_error, variables, context) => {
      if (context?.previousbookmarkStatus) {
        queryClient.setQueryData(
          logKeys.bookmarkStatus(variables.logId, String(user?.user_id)),
          context.previousbookmarkStatus
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: logKeys.bookmarkStatus(variables.logId, String(user?.user_id)),
      });
    },
  });
}
