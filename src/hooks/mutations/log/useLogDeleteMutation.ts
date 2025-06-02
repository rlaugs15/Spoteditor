import { logKeys, placeKeys, searchKeys } from '@/app/actions/keys';
import { deleteLog } from '@/app/actions/log';
import { HOME } from '@/constants/pathname';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogDeleteMutationProps {
  logId: string;
}

const useLogDeleteMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ logId }: LogDeleteMutationProps) => deleteLog(logId),
    onSuccess: ({ success }) => {
      if (success) {
        toast.success('로그가 삭제되었습니다.');
        const keysToInvalidate = [logKeys.log, placeKeys.place, searchKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
        router.replace(HOME);
      }
    },
    onError: () => {
      toast.error('로그 삭제를 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export default useLogDeleteMutation;
