import { logKeys, placeKeys, searchKeys } from '@/app/actions/keys';
import { addPlaceToLog } from '@/app/actions/log-register';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { AddedPlaceValues } from '@/types/log';
import { uploadPlaces } from '@/utils/upload';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface AddPlaceMutationProps {
  values: AddedPlaceValues[];
  logId: string;
}

// 이미지 업로드
// db 갱신 (place, place_images)
const useAddPlaceMutation = () => {
  const queryClient = useQueryClient();
  const clearTag = useLogCreationStore((state) => state.clearTag);

  return useMutation({
    mutationFn: async ({ values, logId }: AddPlaceMutationProps) => {
      /* 장소 이미지 업로드 */
      console.time('📍 추가된 장소 이미지 업로드');
      const { placeDataList, placeImageDataList } = await uploadPlaces(values, logId);
      console.timeEnd('📍 추가된 장소 이미지 업로드');

      return await addPlaceToLog(placeDataList, placeImageDataList);
    },
    onSuccess: ({ success }) => {
      if (success) {
        toast.success('장소가 성공적으로 추가되었습니다.');

        const keysToInvalidate = [logKeys.all, placeKeys.all, searchKeys.all];

        keysToInvalidate.forEach((key) => {
          queryClient.removeQueries({ queryKey: key, exact: false });
        });

        clearTag();
      }
    },
    onError: (error) => {
      console.error('장소 추가 실패:', error);
      toast.error(error.message || '장소 추가에 실패했습니다.');
    },
  });
};

export default useAddPlaceMutation;
