import { logKeys, placeKeys, searchKeys } from '@/app/actions/keys';
import { updateLog } from '@/app/actions/log-update';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogEditMutationProps {
  formData: FormData;
  logId: string;
}

const useLogEditMutation = () => {
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
        toast.success('로그가 성공적으로 수정되었습니다.', {
          description: '페이지가 이동합니다. 잠시만 기다려 주세요.',
        });
      }
    },
    onError: () => {
      toast.error('로그 수정 실패');
    },
  });
};

export default useLogEditMutation;
