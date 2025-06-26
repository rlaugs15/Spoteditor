import { userKeys } from '@/app/actions/keys';
import { logout } from '@/app/actions/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const useLogoutMutation = () => {
  const t = useTranslations('Toast.auth');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      toast.success(t('logoutSuccess'));
      queryClient.removeQueries({ queryKey: userKeys.me() });
    },
    onError: () => {
      toast.error(t('logoutError'));
    },
  });
};

export default useLogoutMutation;
