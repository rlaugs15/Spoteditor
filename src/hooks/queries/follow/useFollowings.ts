import { followKeys } from '@/app/actions/keys';
import { FollowListParams } from '@/types/api/follow';
import { useInfiniteQuery } from '@tanstack/react-query';

async function fetchFollowing({ userId, currentPage, pageSize }: FollowListParams) {
  const res = await fetch(
    `/api/followings?userId=${userId}&currentPage=${currentPage}&pageSize=${pageSize}`
  );
  const data = await res.json();
  return data;
}

export default function useFollowings({
  userId,
  currentPage = 1,
  pageSize = 10,
}: FollowListParams) {
  return useInfiniteQuery({
    queryKey: followKeys.followingList({ userId, currentPage, pageSize }),
    queryFn: async ({ pageParam }) =>
      await fetchFollowing({ ...pageParam, userId, currentPage, pageSize }),
    initialPageParam: { currentPage: 1 },
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.meta.pagination;
      const nextPage = currentPage + 1;
      return nextPage <= totalPages ? { currentPage: nextPage } : null;
    },
  });
}
