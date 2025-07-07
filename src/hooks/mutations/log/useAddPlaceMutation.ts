import { logKeys, placeKeys } from '@/app/actions/keys';
import { addPlaceToLog } from '@/app/actions/log-register';
import { AddedPlaceValues } from '@/types/log';
import { uploadPlacesDirect } from '@/utils/imageUpload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AddPlaceMutationProps {
  values: AddedPlaceValues[];
  logId: string;
  existingOrderCount?: number;
}

// 이미지 업로드
// db 갱신 (place, place_images)
const useAddPlaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ values, logId, existingOrderCount = 0 }: AddPlaceMutationProps) => {
      /* 장소 이미지 업로드 */
      console.time('📍 추가된 장소 이미지 업로드');
      const { placeDataList, placeImageDataList } = await uploadPlacesDirect(
        values,
        logId,
        existingOrderCount
      );
      console.timeEnd('📍 추가된 장소 이미지 업로드');

      return await addPlaceToLog(placeDataList, placeImageDataList);
    },
    onSuccess: ({ success }) => {
      if (success) {
        toast.success('장소가 성공적으로 추가되었습니다.');

        const keysToInvalidate = [logKeys.all, placeKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });
      }
    },
    onError: (error) => {
      console.error('장소 추가 실패:', error);
      toast.error(error.message || '장소 추가에 실패했습니다.');
    },
  });
};

export default useAddPlaceMutation;
