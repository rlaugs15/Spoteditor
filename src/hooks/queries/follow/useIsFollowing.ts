import { followKeys } from '@/app/actions/keys';
import { useQuery } from '@tanstack/react-query';
import { FollowResponse } from '@/types/api/follow';

async function fetchIsFollowing(userId: string) {
  const res = await fetch(`/api/follow?userId=${userId}`);
  const data = await res.json();
  return data;
}

export default function useIsFollowing(userId: string) {
  return useQuery<FollowResponse>({
    queryKey: followKeys.status(userId),
    queryFn: () => fetchIsFollowing(userId),
    enabled: !!userId,
  });
}
