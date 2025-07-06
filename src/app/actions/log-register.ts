'use server';

import { PreparedValues } from '@/hooks/mutations/log/useLogCreateMutation';
import { createClient } from '@/lib/supabase/server';
import { NewAddress, NewLog, NewPlace, NewPlaceImage, NewTag } from '@/types/log';
import { revalidateTag } from 'next/cache';
import { globalTags } from './tags';

/* 로그 등록 */
export async function createLog(values: PreparedValues) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const logData = {
      log_id: values.logId,
      title: values.logTitle,
    };

    const tagsData =
      values.tags &&
      (Object.entries(values.tags).flatMap(([category, tag]) =>
        Array.isArray(tag)
          ? tag.map((t) => ({ category, tag: t, log_id: values.logId }))
          : [{ category, tag, log_id: values.logId }]
      ) ??
        []);

    const addressData = {
      log_id: values.logId,
      ...values.address,
    };

    console.time('🗃️ DB 삽입');
    await insertLogToDB({
      logData,
      tagsData,
      placeDataList: values.placeDataList,
      placeImageDataList: values.placeImageDataList,
      addressData,
    });
    console.timeEnd('🗃️ DB 삽입');

    //서버 캐시 무효화
    const tagsToInvalidate = [globalTags.logAll, globalTags.logListAll, globalTags.searchAll];
    tagsToInvalidate.forEach((tag) => revalidateTag(tag));

    return { success: true, data: values.logId };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '로그 등록 실패' };
  }
}

/* 장소 추가 */
export async function addPlaceToLog(
  placeDataList: NewPlace[],
  placeImageDataList: NewPlaceImage[]
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    console.time('🗃️ DB 삽입');
    await insertLogToDB({
      placeDataList,
      placeImageDataList,
    });
    console.timeEnd('🗃️ DB 삽입');
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '장소 추가 실패' };
  }
}

/* 테이블에 데이터 삽입 */
async function insertLogToDB({
  logData,
  tagsData,
  placeDataList,
  placeImageDataList,
  addressData,
}: {
  logData?: NewLog;
  tagsData?: NewTag[];
  placeDataList?: NewPlace[];
  placeImageDataList?: NewPlaceImage[];
  addressData?: NewAddress;
}) {
  const supabase = await createClient();

  if (logData) {
    const { error: logError } = await supabase.from('log').insert(logData);
    if (logError) {
      console.error(logError);
      throw new Error('로그 테이블 업데이트 실패');
    }
  }

  if (tagsData) {
    const { error: tagError } = await supabase.from('log_tag').insert(tagsData);
    if (tagError) {
      console.error(tagError);
      throw new Error('태그 테이블 업데이트 실패');
    }
  }

  if (placeDataList) {
    const { error: placeError } = await supabase.from('place').insert(placeDataList);
    if (placeError) {
      console.error(placeError);
      throw new Error('장소 테이블 업데이트 실패');
    }
  }

  if (addressData) {
    const { error: addressError } = await supabase.from('address').insert(addressData);
    if (addressError) {
      console.error(addressError);
      throw new Error('주소 테이블 업데이트 실패');
    }
  }

  if (placeImageDataList) {
    const { error: imageError } = await supabase.from('place_images').insert(placeImageDataList);
    if (imageError) {
      console.error(imageError);
      throw new Error('장소 이미지 테이블 업데이트 실패');
    }
  }
}
