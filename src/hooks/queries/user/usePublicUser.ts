import { userKeys } from '@/app/actions/keys';
import { useQuery } from '@tanstack/react-query';
import { PublicUser } from '@/types/api/user';

export default function usePublicUser(userId: string) {
  return useQuery<PublicUser>({
    queryKey: userKeys.publicUser(userId),
    queryFn: async () => {
      const res = await fetch(`/api/public-user?userId=${userId}`);
      const data = await res.json();
      return data.user;
    },
    staleTime: 5 * 60 * 1000,
  });
}
