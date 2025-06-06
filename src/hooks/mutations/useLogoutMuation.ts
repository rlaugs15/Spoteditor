import { userKeys } from '@/app/actions/keys';
import { logout } from '@/app/actions/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      toast.success('로그아웃 성공');
      queryClient.removeQueries({ queryKey: userKeys.me() });
    },
    onError: () => {
      toast.error('로그아웃이 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useLogoutMutation;
