import { scrollToPlaceAfterReorder } from '@/utils/scrollToElement';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { toast } from 'sonner';

const MAX_PLACE_COUNT = 10;

export const INITIAL_PLACE = {
  placeName: '',
  category: '',
  location: '',
  description: '',
  placeImages: [],
};

export function usePlacesHandlers(fields: any[], append: any, remove: any, swap: any) {
  const t = useTranslations('Toast.PlaceDrawer');

  /** 새 장소 추가 */
  const handleAddNewPlace = useCallback(() => {
    if (fields.length >= MAX_PLACE_COUNT) {
      toast.info(t('maxPlaceError'));
      return;
    }
    append(INITIAL_PLACE);
  }, [fields.length, append, t]);

  /** 장소 삭제 */
  const handleDeletePlace = useCallback(
    (idx: number) => {
      if (fields.length <= 1) {
        toast.error(t('minPlaceError'));
        return;
      }
      remove(idx);
    },
    [fields.length, remove, t]
  );

  /** 장소 위로 이동 */
  const handleMovePlaceUp = useCallback(
    (idx: number) => {
      if (idx <= 0) return;
      swap(idx, idx - 1);
      scrollToPlaceAfterReorder(idx, 'up');
    },
    [swap]
  );

  /** 장소 아래로 이동 */
  const handleMovePlaceDown = useCallback(
    (idx: number) => {
      if (idx >= fields.length - 1) return;
      swap(idx, idx + 1);
      scrollToPlaceAfterReorder(idx, 'down');
    },
    [fields.length, swap]
  );

  return {
    handleAddNewPlace,
    handleDeletePlace,
    handleMovePlaceUp,
    handleMovePlaceDown,
  };
}
