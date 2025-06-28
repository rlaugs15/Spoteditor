'use server';
import { createClient } from '@/lib/supabase/server';
import { LogEditFormValues } from '@/types/log';
import { parseFormData } from '@/utils/formatLog';
import { revalidateTag } from 'next/cache';
import { deleteFilesInFolder, getListAllFilesInFolder } from './storage';
import { globalTags } from './tags';

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

    /* 태그 (기존 태그 다 지우고, 새로 추가하기) */
    if (parseResult.tags) {
      const upsertTagsByCategory = async (category: 'mood' | 'activity') => {
        const tags = parseResult.tags?.[category];
        if (!tags?.length) return;

        await supabase.from('log_tag').delete().eq('log_id', logId).eq('category', category);

        // 새 태그
        const newTags = tags.map((tag) => ({
          log_id: logId,
          tag,
          category,
        }));
        const { error: insertTagError } = await supabase.from('log_tag').insert(newTags);

        if (insertTagError) {
          console.error(`태그 삽입 실패 - ${category}`, insertTagError);
          throw new Error(`${category} 태그 삽입 실패`);
        }
      };

      await Promise.all([upsertTagsByCategory('mood'), upsertTagsByCategory('activity')]);
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

        // place_images 장소 이미지 수정 시
        if (place.placeImages && Array.isArray(place.placeImages)) {
          const imageUpdatePromises = place.placeImages.map(async (image, index) => {
            const { error: placeImgError } = await supabase
              .from('place_images')
              .update({
                order: index + 1,
              })
              .eq('place_image_id', image.place_image_id);

            if (placeImgError) {
              console.error('이미지 order 업데이트 실패', placeImgError);
              throw new Error(`이미지 ${image.place_image_id} order 업데이트 실패`);
            }
          });

          await Promise.all(imageUpdatePromises);
        }
      });

      await Promise.all(updatePromises);
    }

    /* 장소 삭제 */
    if (parseResult.deletedPlace) {
      const deletePromises = parseResult.deletedPlace.map(async (placeId) => {
        const { error: placeDeleteError } = await supabase
          .from('place')
          .delete()
          .eq('place_id', placeId);

        if (placeDeleteError) {
          console.error('장소 삭제 실패', placeDeleteError);
          throw new Error(`${placeId} 장소 삭제 실패`);
        }

        const folderPath = `${user.id}/${logId}/${placeId}`;
        const files = await getListAllFilesInFolder(folderPath, 'places');
        if (files && files.length > 0) await deleteFilesInFolder(folderPath, files, 'places');
      });

      await Promise.all(deletePromises);
    }

    /* 장소 이미지 삭제 */
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
      globalTags.logAll,
      globalTags.logBookmarkAll,
      globalTags.logListAll,
      globalTags.placeAll,
      globalTags.placeBookmarkAll,
      globalTags.placeListAll,
      globalTags.searchAll,
    ];
    tagsToInvalidate.forEach((tag) => revalidateTag(tag));
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '로그 수정 실패' };
  }
}
