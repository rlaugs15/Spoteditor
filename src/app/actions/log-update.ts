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

    // 로그 데이터
    const logData = {
      title: parseResult.logTitle,
      description: parseResult.logDescription,
    };

    const { error: logError } = await supabase.from('log').update(logData).eq('log_id', logId);
    if (logError) {
      console.error('로그 테이블 업데이트 실패', logError);
      throw new Error('로그 테이블 업데이트 실패');
    }

    // 장소 데이터
    if (Array.isArray(parseResult.places) && parseResult.places.length > 0) {
      const updatePromises = parseResult.places.map(async (place) => {
        const placeData = {
          name: place.placeName,
          description: place.description,
          category: place.category,
          address: place.location,
          updated_at: new Date(),
        };

        const { error: placeError } = await supabase
          .from('place')
          .update(placeData)
          .eq('place_id', place.id);

        if (placeError) {
          console.error('장소 테이블 업데이트 실패', logError);
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
