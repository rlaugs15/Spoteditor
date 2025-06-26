import { logKeys, placeKeys, searchKeys } from '@/app/actions/keys';
import { updateLog } from '@/app/actions/log-update';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogEditMutationProps {
  formData: FormData;
  logId: string;
}

const useLogEditMutation = () => {
  const t = useTranslations('Toast.logEdit');
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearTag = useLogCreationStore((state) => state.clearTag);
  return useMutation({
    mutationFn: ({ formData, logId }: LogEditMutationProps) => updateLog(formData, logId),
    onSuccess: ({ success }, { logId }) => {
      if (success) {
        clearTag();

        const keysToInvalidate = [logKeys.all, placeKeys.all, searchKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });

        router.replace(`/log/${logId}`);
        toast.success(t('success'));
      }
    },
    onError: () => {
      toast.error(t('error'));
    },
  });
};

export default useLogEditMutation;
