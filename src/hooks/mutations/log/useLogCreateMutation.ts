import { logKeys, searchKeys } from '@/app/actions/keys';
import { createLog } from '@/app/actions/log-register';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { LogFormValues, NewPlace, NewPlaceImage } from '@/types/log';
import { uploadPlaces, uploadThumbnail } from '@/utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Toast.logCreate');
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
      const firstTimeoutId = setTimeout(() => {
        toast.info(t('delayed'), {
          description: t('delayedDescription'),
          id: 'delayed-upload-toast',
          duration: 20_000,
        });
      }, 10_000); // 10초

      const secondTimeoutId = setTimeout(() => {
        toast.info(t('stillUploading'), {
          id: 'long-upload-toast',
          duration: 20_000,
        });
      }, 25_000); // 20초

      return { firstTimeoutId, secondTimeoutId };
    },

    onSuccess: ({ success, data }) => {
      if (success) {
        toast.success(t('success'), {
          description: t('redirect'),
        });

        clearTag();
        router.replace(`/log/${data}`);

        const keysToInvalidate = [logKeys.all, searchKeys.all];
        keysToInvalidate.forEach((key) =>
          queryClient.removeQueries({ queryKey: key, exact: false })
        );
      }
    },
    onError: () => {
      toast.error(t('error'));
    },
    onSettled: (_data, _error, _variables, context) => {
      if (context?.firstTimeoutId) clearTimeout(context.firstTimeoutId);
      if (context?.secondTimeoutId) clearTimeout(context.secondTimeoutId);
      toast.dismiss('delayed-upload-toast');
      toast.dismiss('long-upload-toast');
    },
  });
};

export default useLogCreateMutation;
