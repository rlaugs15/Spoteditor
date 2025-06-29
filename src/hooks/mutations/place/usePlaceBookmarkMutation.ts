import { logKeys, placeKeys } from '@/app/actions/keys';
import useUser from '@/hooks/queries/user/useUser';
import { usePathname } from '@/i18n/navigation';
import { ApiResponse, BookmarkResponse } from '@/types/api/common';
import { DetailLog } from '@/types/api/log';
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

export default function usePlaceBookmarkMutation() {
  const { data: user } = useUser();
  const queryClient = useQueryClient();

  const pathname = usePathname();

  const logId = String(getLogIdFromPath(pathname));

  return useMutation({
    mutationFn: fetchPlaceBookmark,
    onMutate: async ({ placeId, isBookmark }: PlaceBookmarkParams) => {
      await queryClient.cancelQueries({
        queryKey: placeKeys.bookmarkStatus(placeId, String(user?.user_id)),
      });
      await queryClient.cancelQueries({
        queryKey: logKeys.detail(logId),
      });

      const previousData = queryClient.getQueryData(
        placeKeys.bookmarkStatus(placeId, String(user?.user_id))
      );
      const previousLog = queryClient.getQueryData(logKeys.detail(logId));

      queryClient.setQueryData(
        placeKeys.bookmarkStatus(placeId, String(user?.user_id)),
        (old: BookmarkResponse) => ({
          ...old,
          isBookmark: !isBookmark,
        })
      );

      queryClient.setQueryData(
        logKeys.bookmarkStatus(logId, String(user?.user_id)),
        (old: BookmarkResponse) => ({
          ...old,
          isBookmark: !isBookmark,
        })
      );
      queryClient.setQueryData(logKeys.detail(logId), (old: ApiResponse<DetailLog>) => {
        if (!old?.success) return old;

        const updatedPlaces = old.data.place.map((place) => {
          if (place.place_id === placeId) {
            const currentCount = place._count?.place_bookmark ?? 0;
            return {
              ...place,
              _count: {
                ...place._count,
                place_bookmark: currentCount + (isBookmark ? -1 : 1),
              },
            };
          }
          return place;
        });

        return {
          ...old,
          data: {
            ...old.data,
            place: updatedPlaces,
          },
        };
      });

      return { previousData, previousLog };
    },
    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          placeKeys.bookmarkStatus(variables.placeId, String(user?.user_id)),
          context.previousData
        );
      }
      if (context?.previousLog) {
        queryClient.setQueryData(logKeys.detail(logId), context.previousLog);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: placeKeys.bookmarkStatus(variables.placeId, String(user?.user_id)),
      });
      queryClient.invalidateQueries({
        queryKey: logKeys.detail(logId),
      });
    },
  });
}
