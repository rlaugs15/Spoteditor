import { updateLog } from '@/app/actions/log-update';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogEditMutationProps {
  formData: FormData;
  logId: string;
}

const useLogEditMutation = () => {
  const router = useRouter();
  const clearTag = useLogCreationStore((state) => state.clearTag);
  return useMutation({
    mutationFn: ({ formData, logId }: LogEditMutationProps) => updateLog(formData, logId),
    onSuccess: ({ success }, { logId }) => {
      if (success) {
        clearTag();
        router.replace(`/log/${logId}`);
        toast.success('로그 수정 성공');
      }
    },
    onError: () => {
      toast.error('로그 수정 실패');
    },
  });
};

export default useLogEditMutation;
