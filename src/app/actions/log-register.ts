'use server';

import { createClient } from '@/lib/supabase/server';
import {
  LogFormValues,
  NewAddress,
  NewLog,
  NewPlace,
  NewPlaceImage,
  NewTag,
} from '@/types/schema/log';
import { revalidateTag } from 'next/cache';
import { uploadImageToSupabase, uploadMultipleImages } from './storage';
import { globalTags } from './tags';

/* 로그 등록 */
export async function createLog(values: LogFormValues) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const logId = crypto.randomUUID();

    /* 썸네일 업로드 */
    console.time('🖼️ 썸네일 업로드');
    const thumbnailUploadResult = await uploadThumbnail(values.thumbnail, logId);
    console.timeEnd('🖼️ 썸네일 업로드');
    if (!thumbnailUploadResult?.success) throw new Error(thumbnailUploadResult?.msg);

    /* 장소 이미지 업로드 */
    console.time('📍 장소 이미지 업로드');
    const { placeDataList, placeImageDataList } = await uploadPlaces(values.places, logId);
    console.timeEnd('📍 장소 이미지 업로드');

    const logData = {
      log_id: logId,
      title: values.logTitle,
      description: values.logDescription,
      thumbnail_url: thumbnailUploadResult.data,
    };

    const tagsData =
      values.tags &&
      (Object.entries(values.tags).flatMap(([category, tag]) =>
        Array.isArray(tag)
          ? tag.map((t) => ({ category, tag: t, log_id: logId }))
          : [{ category, tag, log_id: logId }]
      ) ??
        []);

    const addressData = {
      log_id: logId,
      ...values.address,
    };

    console.time('🗃️ DB 삽입');
    await insertLogToDB({ logData, tagsData, placeDataList, placeImageDataList, addressData });
    console.timeEnd('🗃️ DB 삽입');

    //서버 캐시 무효화
    const tagsToInvalidate = [globalTags.logAll, globalTags.logListAll, globalTags.searchAll];
    tagsToInvalidate.forEach((tag) => revalidateTag(tag));

    return { success: true, data: logId };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '로그 등록 실패' };
  }
}

/* 썸네일 업로드 */
async function uploadThumbnail(thumbnail: Blob, logId: string) {
  return await uploadImageToSupabase('thumbnails', thumbnail, {
    folder: logId,
    filename: `${logId}.webp`,
  });
}

/* 장소 이미지 업로드 */
async function uploadPlaces(places: LogFormValues['places'], logId: string) {
  const placeDataList: NewPlace[] = [];
  const placeImageDataList: NewPlaceImage[] = [];

  for (let placeIdx = 0; placeIdx < places.length; placeIdx++) {
    const { placeName, description, location, category, placeImages } = places[placeIdx];
    const placeId = crypto.randomUUID();

    // 장소 데이터 생성
    placeDataList.push({
      place_id: placeId,
      log_id: logId,
      name: placeName,
      description,
      address: location,
      category,
      order: placeIdx + 1,
    });

    // 이미지 업로드
    const files = placeImages.map((img) => img.file);
    const uploadResult = await uploadMultipleImages({
      files,
      bucketName: 'places',
      folder: logId,
      subfolder: placeId,
    });

    if (!uploadResult.success) {
      throw new Error(uploadResult.msg || '장소 이미지 업로드 실패');
    }

    const uploaded = uploadResult.data.map((url, i) => ({
      image_path: url,
      order: placeImages[i].order,
      place_id: placeId,
    }));

    placeImageDataList.push(...uploaded);
  }

  return { placeDataList, placeImageDataList };
}

/* 테이블에 데이터 삽입 */
async function insertLogToDB({
  logData,
  tagsData,
  placeDataList,
  placeImageDataList,
  addressData,
}: {
  logData: NewLog;
  tagsData?: NewTag[];
  placeDataList: NewPlace[];
  placeImageDataList: NewPlaceImage[];
  addressData: NewAddress;
}) {
  const supabase = await createClient();

  const { error: logError } = await supabase.from('log').insert(logData);
  if (logError) {
    console.error(logError);
    throw new Error('로그 테이블 업데이트 실패');
  }

  if (tagsData) {
    const { error: tagError } = await supabase.from('log_tag').insert(tagsData);
    if (tagError) {
      console.error(tagError);
      throw new Error('태그 테이블 업데이트 실패');
    }
  }

  const { error: placeError } = await supabase.from('place').insert(placeDataList);
  if (placeError) {
    console.error(placeError);
    throw new Error('장소 테이블 업데이트 실패');
  }

  const { error: addressError } = await supabase.from('address').insert(addressData);
  if (addressError) {
    console.error(addressError);
    throw new Error('주소 테이블 업데이트 실패');
  }

  const { error: imageError } = await supabase.from('place_images').insert(placeImageDataList);
  if (imageError) {
    console.error(imageError);
    throw new Error('장소 이미지 테이블 업데이트 실패');
  }
}
