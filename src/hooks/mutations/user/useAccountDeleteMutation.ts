import { followKeys, logKeys, placeKeys, searchKeys, userKeys } from '@/app/actions/keys';
import { createClient } from '@/lib/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

export default function useAccountDeleteMutation({
  onSuccess,
  onError,
}: {
  onSuccess?: (msg: string) => void;
  onError?: (msg: string) => void;
}) {
  const t = useTranslations('Toast.account');
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/user', { method: 'POST' });
      const result = await res.json();

      if (!result.success) throw new Error(result.msg);

      const supabase = createClient();
      await supabase.auth.signOut();

      const keysToRemove = [
        userKeys.all,
        followKeys.all,
        logKeys.all,
        placeKeys.all,
        searchKeys.all,
      ];
      keysToRemove.forEach((key) => queryClient.removeQueries({ queryKey: key, exact: false }));

      return result.msg;
    },
    onSuccess: (msg) => {
      toast.success(t('deleteSuccess'));
      onSuccess?.(msg);
    },
    onError: (err: Error) => {
      toast.error(t('deleteError'));
      onError?.(err.message);
    },
  });
}
