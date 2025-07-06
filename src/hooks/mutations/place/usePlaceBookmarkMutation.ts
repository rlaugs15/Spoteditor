import { placeKeys } from '@/app/actions/keys';
import useUser from '@/hooks/queries/user/useUser';
import { BookmarkResponse } from '@/types/api/common';
import { PlaceBookmarkParams } from '@/types/api/place';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function getLogIdFromPath(pathname: string): string | null {
  const match = pathname.match(/\/log\/([a-f0-9-]{36})/); // UUID 패턴
  return match ? match[1] : null;
}

async function fetchPlaceBookmark({
  placeId,
  isBookmark,
}: PlaceBookmarkParams): Promise<BookmarkResponse> {
  const res = await fetch(`/api/place/bookmark/check?placeId=${placeId}`, {
    method: isBookmark ? 'DELETE' : 'POST',
  });
  const data = await res.json();
  return data;
}

export default function usePlaceBookmarkMutation(onToggle?: (newStatus: boolean) => void) {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchPlaceBookmark,
    onMutate: async ({ placeId, isBookmark }: PlaceBookmarkParams) => {
      await queryClient.cancelQueries({
        queryKey: placeKeys.bookmarkStatus(placeId, String(user?.user_id)),
      });

      const previousData = queryClient.getQueryData(
        placeKeys.bookmarkStatus(placeId, String(user?.user_id))
      );

      queryClient.setQueryData(
        placeKeys.bookmarkStatus(placeId, String(user?.user_id)),
        (old: BookmarkResponse) => ({
          ...old,
          isBookmark: !isBookmark,
        })
      );

      // 상세페이지 카운트 반영
      onToggle?.(!isBookmark);

      return { previousData };
    },
    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          placeKeys.bookmarkStatus(variables.placeId, String(user?.user_id)),
          context.previousData
        );
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: placeKeys.bookmarkStatus(variables.placeId, String(user?.user_id)),
      });
    },
  });
}
