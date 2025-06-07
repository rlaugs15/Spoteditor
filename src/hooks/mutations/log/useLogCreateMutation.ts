import { logKeys, searchKeys } from '@/app/actions/keys';
import { createLog } from '@/app/actions/log-register';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogCreateMutationProps {
  formData: FormData;
}

const useLogCreateMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearTag = useLogCreationStore((state) => state.clearTag);
  return useMutation({
    mutationFn: ({ formData }: LogCreateMutationProps) => createLog(formData),
    onSuccess: ({ success, data }) => {
      if (success) {
        clearTag();

        const keysToInvalidate = [logKeys.log, searchKeys.all];

        keysToInvalidate.forEach((key) =>
          queryClient.removeQueries({ queryKey: key, exact: false })
        );

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
