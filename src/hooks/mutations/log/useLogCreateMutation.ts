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

      // 클라이언트에서 이미지 업로드
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
    onSuccess: ({ success, data }) => {
      if (success) {
        clearTag();
        router.replace(`/log/${data}`);
        toast.success('업로드 성공');

        const keysToInvalidate = [logKeys.log, searchKeys.all];
        keysToInvalidate.forEach((key) =>
          queryClient.removeQueries({ queryKey: key, exact: false })
        );
      }
    },
    onError: () => {
      toast.error('업로드 실패');
    },
  });
};

export default useLogCreateMutation;
