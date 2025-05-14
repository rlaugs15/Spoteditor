'use server';

import { createClient } from '@/lib/supabase/server';
import { LogFormValues, NewLog, NewPlace, NewPlaceImage } from '@/types/schema/log';
import { parseFormData } from '@/utils/formatLog';
import { uploadFile } from './storage';

/* 로그 등록 */
export async function createLog(formData: FormData) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const logId = crypto.randomUUID();
    const parseResult = parseFormData<LogFormValues>(formData);

    /* 썸네일 업로드 */
    const thumbnailUploadResult = await uploadThumbnail(parseResult.thumbnail, logId);
    if (!thumbnailUploadResult?.success) throw new Error(thumbnailUploadResult?.msg);

    /* 장소 이미지 업로드 */
    const { placeDataList, placeImageDataList } = await uploadPlaces(parseResult.places, logId);

    const logData = {
      log_id: logId,
      title: parseResult.logTitle,
      description: parseResult.logDescription,
      thumbnail_url: thumbnailUploadResult.fullPath,
    };

    await insertLogToDB({ logData, placeDataList, placeImageDataList });

    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false, msg: '로그 등록 실패' };
  }
}

/* 썸네일 업로드 */
async function uploadThumbnail(thumbnail: Blob, logId: string) {
  return await uploadFile('thumbnails', thumbnail, {
    folder: logId,
    subfolder: '',
    filename: `${logId}.webp`,
  });
}

/* 장소 이미지 업로드 */
async function uploadPlaces(places: LogFormValues['places'], logId: string) {
  const placeDataList: NewPlace[] = [];
  const placeImageDataList: NewPlaceImage[] = [];

  // 장소 개수만큼 이미지 생성
  for (let placeIdx = 0; placeIdx < places.length; placeIdx++) {
    const { placeName, description, location, category, placeImages } = places[placeIdx];
    const placeId = crypto.randomUUID();

    placeDataList.push({
      place_id: placeId,
      log_id: logId,
      name: placeName,
      description: description,
      address: location,
      category: category,
    });

    for (let imgIdx = 0; imgIdx < placeImages.length; imgIdx++) {
      const { file, order } = placeImages[imgIdx];

      const uploadResult = await uploadFile('places', file, {
        folder: logId,
        subfolder: placeId,
        filename: `${imgIdx}.webp`,
      });
      if (!uploadResult?.success) throw new Error(uploadResult?.msg);

      placeImageDataList.push({
        image_path: uploadResult.fullPath as string,
        order,
        place_id: placeId,
      });
    }
  }

  return { placeDataList, placeImageDataList };
}

/* 테이블에 데이터 삽입 */
async function insertLogToDB({
  logData,
  placeDataList,
  placeImageDataList,
}: {
  logData: NewLog;
  placeDataList: NewPlace[];
  placeImageDataList: NewPlaceImage[];
}) {
  const supabase = await createClient();

  const { error: logError } = await supabase.from('log').insert(logData);
  if (logError) {
    console.error(logError);
    throw new Error('로그 테이블 업데이트 실패');
  }

  const { error: placeError } = await supabase.from('place').insert(placeDataList);
  if (placeError) {
    console.error(placeError);
    throw new Error('장소 테이블 업데이트 실패');
  }

  const { error: imageError } = await supabase.from('place_images').insert(placeImageDataList);
  if (imageError) {
    console.error(imageError);
    throw new Error('장소 이미지 테이블 업데이트 실패');
  }
}
