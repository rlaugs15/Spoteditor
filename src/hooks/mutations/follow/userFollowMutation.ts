import { followKeys } from '@/app/actions/keys';
import { ApiResponse } from '@/types/api/common';
import { FollowParams, FollowResponse } from '@/types/api/follow';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchFollow({ userId, isFollowing }: FollowParams): Promise<ApiResponse<null>> {
  const res = await fetch(`/api/follow?userId=${userId}`, {
    method: isFollowing ? 'DELETE' : 'POST',
  });
  const data = await res.json();
  return data;
}

export default function useFollowMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchFollow,
    onMutate: async ({ userId, isFollowing }: FollowParams) => {
      await queryClient.cancelQueries({ queryKey: followKeys.status(userId) });

      const previousData = queryClient.getQueryData(followKeys.status(userId));

      queryClient.setQueryData(followKeys.status(userId), (old: FollowResponse) => ({
        ...old,
        isFollowing: !isFollowing,
      }));

      return { previousData };
    },
    onError: (_error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(followKeys.status(variables.userId), context.previousData);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: followKeys.status(variables.userId) });
    },
  });
}
