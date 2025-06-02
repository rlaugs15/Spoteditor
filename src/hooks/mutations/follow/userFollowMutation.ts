import { followKeys, userKeys } from '@/app/actions/keys';
import { ApiResponse } from '@/types/api/common';
import { FollowParams, FollowResponse } from '@/types/api/follow';
import { IUser, PublicUser } from '@/types/api/user';
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
      await queryClient.cancelQueries({ queryKey: userKeys.publicUser(userId) });
      await queryClient.cancelQueries({ queryKey: userKeys.me() });

      const previousFollowData = queryClient.getQueryData(followKeys.status(userId));
      const previousUserData = queryClient.getQueryData(userKeys.publicUser(userId));
      const previousMeData = queryClient.getQueryData(userKeys.me());

      queryClient.setQueryData(followKeys.status(userId), (old: FollowResponse) => ({
        ...old,
        isFollowing: !isFollowing,
      }));

      queryClient.setQueryData(userKeys.publicUser(userId), (old: PublicUser | undefined) => {
        if (!old) return old;
        const followerCount = isFollowing
          ? Math.max(0, old.followerCount - 1)
          : old.followerCount + 1;
        return {
          ...old,
          followerCount,
        };
      });

      queryClient.setQueryData(userKeys.me(), (old: IUser | undefined) => {
        if (!old) return old;
        const followingCount = isFollowing
          ? Math.max(0, old.followingCount - 1)
          : old.followingCount + 1;
        return {
          ...old,
          followingCount,
        };
      });

      return { previousFollowData, previousUserData, previousMeData };
    },

    onError: (_error, variables, context) => {
      if (context?.previousFollowData) {
        queryClient.setQueryData(followKeys.status(variables.userId), context.previousFollowData);
      }
      if (context?.previousUserData) {
        queryClient.setQueryData(userKeys.publicUser(variables.userId), context.previousUserData);
      }
      if (context?.previousMeData) {
        queryClient.setQueryData(userKeys.me(), context.previousMeData);
      }
    },
  });
}
