import { logKeys, searchKeys } from '@/app/actions/keys';
import { createLog } from '@/app/actions/log-register';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { LogFormValues, NewPlace, NewPlaceImage } from '@/types/schema/log';
import { uploadPlaces, uploadThumbnail } from '@/utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface LogCreateMutationProps {
  values: LogFormValues;
}

export type PreparedValues = {
  logId: string;
  thumbnailUrl: string;
  placeDataList: NewPlace[];
  placeImageDataList: NewPlaceImage[];
} & Pick<LogFormValues, 'logTitle' | 'logDescription' | 'address' | 'tags'>;

const useLogCreateMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearTag = useLogCreationStore((state) => state.clearTag);
  return useMutation({
    mutationFn: async ({ values }: LogCreateMutationProps) => {
      const logId = crypto.randomUUID();

      /* 썸네일 업로드 */
      // console.time('🖼️ 썸네일 업로드');
      const thumbnailUploadResult = await uploadThumbnail(values.thumbnail, logId);
      // console.timeEnd('🖼️ 썸네일 업로드');
      if (!thumbnailUploadResult?.success) throw new Error(thumbnailUploadResult?.msg);

      /* 장소 이미지 업로드 */
      // console.time('📍 장소 이미지 업로드');
      const { placeDataList, placeImageDataList } = await uploadPlaces(values.places, logId);
      // console.timeEnd('📍 장소 이미지 업로드');

      // 서버로 보낼 데이터 모아서 보내기
      const preparedValues: PreparedValues = {
        logId,
        logTitle: values.logTitle,
        logDescription: values.logDescription,
        tags: values.tags,
        address: values.address,
        thumbnailUrl: thumbnailUploadResult.data,
        placeDataList,
        placeImageDataList,
      };

      return await createLog(preparedValues);
    },
    onMutate: () => {
      const timeoutId = setTimeout(() => {
        toast.info('이미지 업로드가 조금 오래 걸리고 있어요.', {
          description: '잠시만 기다려주세요...',
          id: 'delayed-upload-toast',
          duration: 8000,
        });
      }, 10_000); // 10초

      return { timeoutId };
    },
    onSuccess: ({ success, data }) => {
      if (success) {
        toast.success('업로드가 성공적으로 완료되었습니다.', {
          description: '페이지가 이동합니다. 잠시만 기다려 주세요.',
        });

        clearTag();
        router.replace(`/log/${data}`);

        const keysToInvalidate = [logKeys.log, searchKeys.all];
        keysToInvalidate.forEach((key) =>
          queryClient.removeQueries({ queryKey: key, exact: false })
        );
      }
    },
    onError: () => {
      toast.error('업로드가 실패했습니다. 다시 시도해주세요');
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.timeoutId) clearTimeout(context.timeoutId);
      toast.dismiss('delayed-upload-toast');
    },
  });
};

export default useLogCreateMutation;
