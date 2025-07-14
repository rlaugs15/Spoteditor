'use server';

import { LogCreatePayload } from '@/hooks/mutations/log/useLogCreateMutation';
import { createClient } from '@/lib/supabase/server';
import { NewAddress, NewLog, NewPlace, NewPlaceImage } from '@/types/log';
import { SupabaseClient } from '@supabase/supabase-js';
import { revalidateTag } from 'next/cache';
import { globalTags } from './tags';

/* 로그 등록 */
export async function createLog(values: LogCreatePayload) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    // 로그 데이터 삽입
    await performDatabaseInserts(supabase, values);

    // 캐시 무효화
    await invalidateCache();

    return { success: true, data: values.logId };
  } catch (error) {
    console.error('로그 등록 실패:', error);
    return { success: false, msg: error instanceof Error ? error.message : '로그 등록 실패' };
  }
}

/* 기존 로그에 장소 추가 */
export async function addPlacesToExistingLog(
  placeDataList: NewPlace[],
  placeImageDataList: NewPlaceImage[]
) {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    // 장소 데이터만 삽입
    await performPlaceInserts(supabase, placeDataList, placeImageDataList);

    // 캐시 무효화
    await invalidateCache();

    return { success: true };
  } catch (error) {
    console.error('기존 로그에 장소 추가 실패:', error);
    return {
      success: false,
      msg: error instanceof Error ? error.message : '기존 로그에 장소 추가 실패',
    };
  }
}

async function performDatabaseInserts(supabase: SupabaseClient, values: LogCreatePayload) {
  console.time('🗃️ DB 삽입');

  // 1. 로그 데이터 삽입
  const logData: NewLog = {
    log_id: values.logId,
    title: values.logTitle,
  };
  await insertLogData(supabase, logData);

  // 2. 태그 데이터 삽입
  if (values.tags) {
    await insertTagsData(supabase, values.tags, values.logId);
  }

  // 3. 주소 데이터 삽입
  if (values.address) {
    await insertAddressData(supabase, values.address, values.logId);
  }

  // 4. 장소 데이터 삽입
  if (values.placeDataList?.length) {
    await insertPlaceData(supabase, values.placeDataList);
  }

  // 5. 장소 이미지 데이터 삽입
  if (values.placeImageDataList?.length) {
    await insertPlaceImageData(supabase, values.placeImageDataList);
  }

  console.timeEnd('🗃️ DB 삽입');
}

// 장소 데이터만 삽입하는 함수
async function performPlaceInserts(
  supabase: SupabaseClient,
  placeDataList: NewPlace[],
  placeImageDataList: NewPlaceImage[]
) {
  console.time('🗃️ 장소 DB 삽입');

  // 장소 데이터 삽입
  await insertPlaceData(supabase, placeDataList);

  // 장소 이미지 데이터 삽입
  if (placeImageDataList?.length) {
    await insertPlaceImageData(supabase, placeImageDataList);
  }

  console.timeEnd('🗃️ 장소 DB 삽입');
}

// 로그 데이터 삽입
async function insertLogData(supabase: SupabaseClient, logData: NewLog) {
  const { error } = await supabase.from('log').insert(logData);
  if (error) {
    console.error('로그 테이블 삽입 실패:', error);
    throw new Error('로그 테이블 삽입 실패');
  }
}

// 태그 데이터 삽입
async function insertTagsData(
  supabase: SupabaseClient,
  tags: Record<string, string | string[]>,
  logId: string
) {
  const tagsData = Object.entries(tags).flatMap(([category, tag]) =>
    Array.isArray(tag)
      ? tag.map((t) => ({ category, tag: t, log_id: logId }))
      : [{ category, tag, log_id: logId }]
  );

  const { error } = await supabase.from('log_tag').insert(tagsData);
  if (error) {
    console.error('태그 테이블 삽입 실패:', error);
    throw new Error('태그 테이블 삽입 실패');
  }
}

// 주소 데이터 삽입
async function insertAddressData(supabase: SupabaseClient, address: any, logId: string) {
  const addressData: NewAddress = {
    log_id: logId,
    ...address,
  };

  const { error } = await supabase.from('address').insert(addressData);
  if (error) {
    console.error('주소 테이블 삽입 실패:', error);
    throw new Error('주소 테이블 삽입 실패');
  }
}

// 장소 데이터 삽입
async function insertPlaceData(supabase: SupabaseClient, placeDataList: NewPlace[]) {
  const { error } = await supabase.from('place').insert(placeDataList);
  if (error) {
    console.error('장소 테이블 삽입 실패:', error);
    throw new Error('장소 테이블 삽입 실패');
  }
}

// 장소 이미지 데이터 삽입
async function insertPlaceImageData(supabase: SupabaseClient, placeImageDataList: NewPlaceImage[]) {
  const { error } = await supabase.from('place_images').insert(placeImageDataList);
  if (error) {
    console.error('장소 이미지 테이블 삽입 실패:', error);
    throw new Error('장소 이미지 테이블 삽입 실패');
  }
}

// 캐시 무효화 함수
async function invalidateCache() {
  const tagsToInvalidate = [globalTags.logAll, globalTags.logListAll, globalTags.searchAll];

  tagsToInvalidate.forEach((tag) => revalidateTag(tag));
}
