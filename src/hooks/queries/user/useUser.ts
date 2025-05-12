import { userKeys } from '@/app/actions/fetch/user/userKeys';
import { useQuery } from '@tanstack/react-query';

export default function useUser() {
  return useQuery({
    queryKey: userKeys.me(),
    queryFn: async () => {
      const res = await fetch('/api/user');
      const data = await res.json();
      return data.user;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
}
