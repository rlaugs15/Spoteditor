import { LogEditFormValues } from '@/types/log';
import { Tables } from '@/types/supabase';
import { FieldValues } from 'react-hook-form';

/* 폼 데이터에서 변경된 필드만 추출 */
export function extractDirtyValues<T extends FieldValues>(
  dirtyFields: any,
  allValues: T
): Partial<T> {
  if (!dirtyFields || !allValues) return {};
  if (typeof dirtyFields !== 'object' || dirtyFields === true) return allValues;

  const result: any = Array.isArray(dirtyFields) ? [] : {};

  for (const key in dirtyFields) {
    if (dirtyFields[key] && allValues[key] !== undefined) {
      result[key] =
        dirtyFields[key] === true
          ? allValues[key]
          : extractDirtyValues(dirtyFields[key], allValues[key]);
    }
  }

  return result;
}

/* 변경된 필드만 추출하는 유틸 함수 */
export function pickDirtyFields<T>(dirty: Partial<T> | undefined, keys: (keyof T)[]): Partial<T> {
  if (!dirty) return {};
  return keys.reduce((acc, key) => {
    if (dirty[key] !== undefined) acc[key] = dirty[key];
    return acc;
  }, {} as Partial<T>);
}

/* 장소 이미지 순서 변경 확인용 */
export function isImageOrderChanged(
  prevImages: Tables<'place_images'>[], // places.map((p) => p.place_images).flat(),
  currImages: LogEditFormValues['places'][number]['placeImages'] // form.getValues('places').map((p) => p.placeImages).flat()
) {
  if (prevImages.length !== currImages.length) return true;

  // 같은 인덱스에 있는 이미지의 place_image_id 비교
  return prevImages.some(
    (prevImg, idx) => prevImg?.place_image_id !== currImages[idx]?.place_image_id
  );
}

/* 장소 순서 변경 확인용 */
export const isOrderChanged = (
  initialPlaces: Tables<'place'>[], // 초기 장소 데이터
  currentPlaces: LogEditFormValues['places']
) => {
  if (initialPlaces.length !== currentPlaces.length) return true;

  // 같은 인덱스에 있는 장소의 ID가 다른지 확인
  return currentPlaces.some((current, idx) => current.id !== initialPlaces[idx]?.place_id);
};
