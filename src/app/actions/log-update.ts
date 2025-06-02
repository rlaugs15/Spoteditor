'use server';
import { createClient } from '@/lib/supabase/server';
import { LogEditFormValues } from '@/types/schema/log';
import { parseFormData } from '@/utils/formatLog';
import { revalidateTag } from 'next/cache';
import { cacheTags } from './tags';

export async function updateLog(formData: FormData, logId: string) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');
    const parseResult = parseFormData<LogEditFormValues>(formData);

    /* 로그 데이터 */
    if (parseResult.logTitle || parseResult.logDescription) {
      const logData: Record<string, string> = {};

      if (parseResult.logTitle) logData.title = parseResult.logTitle;
      if (parseResult.logDescription) logData.description = parseResult.logDescription;

      const { error: logError } = await supabase.from('log').update(logData).eq('log_id', logId);
      if (logError) {
        console.error('로그 테이블 업데이트 실패', logError);
        throw new Error('로그 테이블 업데이트 실패');
      }
    }

    const hasMoodTags = parseResult.tags?.mood?.length;
    const hasActivityTags = parseResult.tags?.activity?.length;

    /* 태그 (기존 태그 다 지우고, 새로 추가하기) */
    if (hasMoodTags || hasActivityTags) {
      await supabase.from('log_tag').delete().eq('log_id', logId);

      const newTags = [
        ...(parseResult.tags?.mood || []).map((tag) => ({
          log_id: logId,
          tag,
          category: 'mood',
        })),
        ...(parseResult.tags?.activity || []).map((tag) => ({
          log_id: logId,
          tag,
          category: 'activity',
        })),
      ];

      if (newTags.length > 0) {
        const { error: insertTagError } = await supabase.from('log_tag').insert(newTags);
        if (insertTagError) {
          console.error('태그 삽입 실패', insertTagError);
          throw new Error('태그 삽입 실패');
        }
      }
    }

    /* 장소 데이터 */
    if (Array.isArray(parseResult.places) && parseResult.places.length > 0) {
      const updatePromises = parseResult.places.map(async (place) => {
        const placeData: Record<string, string | Date | number> = {};
        if (place.placeName) placeData.name = place.placeName;
        if (place.description) placeData.description = place.description;
        if (place.category) placeData.category = place.category;
        if (place.location) placeData.address = place.location;
        if (place.order) placeData.order = place.order;
        placeData.updated_at = new Date();

        const { error: placeError } = await supabase
          .from('place')
          .update(placeData)
          .eq('place_id', place.id);

        if (placeError) {
          console.error('장소 테이블 업데이트 실패', placeError);
          throw new Error(`place_id ${place.id} 업데이트 실패`);
        }
      });

      await Promise.all(updatePromises);
    }

    if (parseResult.deletedPlace) {
      const deletePromises = parseResult.deletedPlace.map(async (placeId) => {
        const { error: placeDeleteError } = await supabase
          .from('place')
          .delete()
          .eq('place_id', placeId);

        const { error: storageDeleteError } = await supabase.storage
          .from('places')
          .remove([`${user.id}/${logId}/${placeId}`]);

        if (placeDeleteError) {
          console.error('장소 삭제 실패', placeDeleteError);
          throw new Error(`${placeId} 장소 삭제 실패`);
        }

        if (storageDeleteError) {
          console.error('장소 이미지 삭제 실패', storageDeleteError);
          throw new Error(`${placeId} 이미지 삭제 실패`);
        }
      });

      await Promise.all(deletePromises);
    }

    if (parseResult.deletedPlaceImages?.length) {
      const { error: placeImgDeleteError } = await supabase
        .from('place_images')
        .delete()
        .in('place_image_id', parseResult.deletedPlaceImages);

      if (placeImgDeleteError) {
        console.error('DB place_image 삭제 실패', placeImgDeleteError);
        throw new Error('place_images 삭제 실패');
      }
    }

    //서버 캐시 무효화
    const tagsToInvalidate = [
      cacheTags.logDetail(logId),
      cacheTags.logList(),
      cacheTags.placeList(),
    ];
    tagsToInvalidate.forEach((tag) => revalidateTag(tag));

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '로그 수정 실패' };
  }
}
