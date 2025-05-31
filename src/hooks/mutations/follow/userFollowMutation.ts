import { followKeys, userKeys } from '@/app/actions/keys';
import { ActionResponse } from '@/types/api/common';
import { FollowParams, FollowResponse } from '@/types/api/follow';
import { PublicUser } from '@/types/api/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function fetchFollow({ userId, isFollowing }: FollowParams): Promise<ActionResponse> {
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
      await queryClient.cancelQueries({ queryKey: userKeys.publicUser(userId) });

      const previousFollowData = queryClient.getQueryData(followKeys.status(userId));
      const previousUserData = queryClient.getQueryData(userKeys.publicUser(userId));

      queryClient.setQueryData(followKeys.status(userId), (old: FollowResponse) => ({
        ...old,
        isFollowing: !isFollowing,
      }));
      queryClient.setQueryData(userKeys.publicUser(userId), (old: PublicUser) => {
        if (!old) return old;
        const followingCount = isFollowing ? old.followingCount - 1 : old.followingCount + 1;
        return {
          ...old,
          followingCount,
        };
      });

      return { previousFollowData, previousUserData };
    },
    onError: (_error, variables, context) => {
      if (context?.previousFollowData) {
        queryClient.setQueryData(followKeys.status(variables.userId), context.previousFollowData);
      }
      if (context?.previousUserData) {
        queryClient.setQueryData(userKeys.publicUser(variables.userId), context.previousUserData);
      }
    },
    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({ queryKey: followKeys.status(variables.userId) });
      queryClient.invalidateQueries({ queryKey: userKeys.publicUser(variables.userId) });
    },
  });
}
