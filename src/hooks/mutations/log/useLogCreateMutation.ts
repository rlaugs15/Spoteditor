import { createLog } from '@/app/actions/log-register';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogCreateMutationProps {
  formData: FormData;
}

const useLogCreateMutation = () => {
  const router = useRouter();
  const clearTag = useLogCreationStore((state) => state.clearTag);
  return useMutation({
    mutationFn: ({ formData }: LogCreateMutationProps) => createLog(formData),
    onSuccess: ({ success, data }) => {
      if (success) {
        clearTag();
        router.replace(`/log/${data}`);
        toast.success('업로드 성공');
      }
    },
    onError: () => {
      toast.error('업로드 실패');
    },
  });
};

export default useLogCreateMutation;
