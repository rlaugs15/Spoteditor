import { logKeys, placeKeys, searchKeys } from '@/app/actions/keys';
import { updateLog } from '@/app/actions/log-update';
import { useRouter } from '@/i18n/navigation';
import { trackLogEditEvent } from '@/lib/analytics';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

interface LogEditMutationProps {
  formData: FormData;
  logId: string;
}

const useLogEditMutation = () => {
  const t = useTranslations('Toast.logEdit');
  const tToast = useTranslations('Toast.logCreate');
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearTag = useLogCreationStore((state) => state.clearTag);

  const locale = useLocale();
  const normalizedLocale = locale === 'en' ? 'en' : 'ko';

  return useMutation({
    mutationFn: ({ formData, logId }: LogEditMutationProps) =>
      updateLog(formData, logId, normalizedLocale),
    onSuccess: ({ success }, { logId }) => {
      if (success) {
        trackLogEditEvent('complete');

        clearTag();

        //캐시 무효화
        const keysToInvalidate = [logKeys.all, placeKeys.all, searchKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });

        router.replace(`/log/${logId}`);
        toast.success(t('success'), {
          description: tToast('redirect'),
        });
      }
    },
    onError: () => {
      trackLogEditEvent('cancel');

      toast.error(t('error'));
    },
  });
};

export default useLogEditMutation;
