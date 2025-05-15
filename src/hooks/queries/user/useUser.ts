import { userKeys } from '@/app/actions/keys';
import { useQuery } from '@tanstack/react-query';
import { IUser } from '@/types/api/user';

export default function useUser() {
  return useQuery<IUser>({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      return data.user;
    },
    staleTime: Infinity,
  });
}
