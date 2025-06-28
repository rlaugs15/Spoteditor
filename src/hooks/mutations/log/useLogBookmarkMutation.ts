import { logKeys } from '@/app/actions/keys';
import useUser from '@/hooks/queries/user/useUser';
import { ApiResponse, BookmarkResponse } from '@/types/api/common';
import { DetailLog, LogBookmarkCheckParams } from '@/types/api/log';
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
      await queryClient.cancelQueries({
        queryKey: logKeys.detail(logId),
      });

      const previousbookmarkStatus = queryClient.getQueryData(
        logKeys.bookmarkStatus(logId, String(user?.user_id))
      );
      const previousLog = queryClient.getQueryData(logKeys.detail(logId));

      queryClient.setQueryData(
        logKeys.bookmarkStatus(logId, String(user?.user_id)),
        (old: BookmarkResponse) => ({
          ...old,
          isBookmark: !isBookmark,
        })
      );
      queryClient.setQueryData(logKeys.detail(logId), (old: ApiResponse<DetailLog>) => {
        if (!old?.success || !old.data?._count) return old;

        const currentCount = old.data._count.log_bookmark ?? 0;

        return {
          ...old,
          data: {
            ...old.data,
            _count: {
              ...old.data._count,
              log_bookmark: currentCount + (isBookmark ? -1 : 1),
            },
          },
        };
      });

      return { previousbookmarkStatus, previousLog };
    },
    onError: (_error, variables, context) => {
      if (context?.previousbookmarkStatus) {
        queryClient.setQueryData(
          logKeys.bookmarkStatus(variables.logId, String(user?.user_id)),
          context.previousbookmarkStatus
        );
      }

      if (context?.previousLog) {
        queryClient.setQueryData(logKeys.detail(variables.logId), context.previousLog);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: logKeys.bookmarkStatus(variables.logId, String(user?.user_id)),
      });
      queryClient.invalidateQueries({
        queryKey: logKeys.detail(variables.logId),
      });
    },
  });
}
