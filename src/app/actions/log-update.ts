'use server';
import { createClient } from '@/lib/supabase/server';
import { LogEditFormValues } from '@/types/schema/log';
import { parseFormData } from '@/utils/formatLog';

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
        const placeData: Record<string, string | Date> = {};
        if (place.placeName) placeData.name = place.placeName;
        if (place.description) placeData.description = place.description;
        if (place.category) placeData.category = place.category;
        if (place.location) placeData.address = place.location;
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

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '로그 수정 실패' };
  }
}
