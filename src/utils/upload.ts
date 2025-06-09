import { getMultipleSignedUploadUrls, getSignedUploadUrl } from '@/app/actions/storage';
import { getUser } from '@/app/actions/user';
import { createClient } from '@/lib/supabase/client';
import { ApiResponse } from '@/types/api/common';
import { StorageBucket } from '@/types/api/storage';
import { LogFormValues, NewPlace, NewPlaceImage } from '@/types/schema/log';
import pLimit from 'p-limit';

/* 단일 이미지 업로드 */
type UploadImageOptions = {
  folder?: string;
  subfolder?: string;
  filename: string;
};

export async function uploadImageToSupabase(
  bucketName: StorageBucket,
  file: Blob,
  options: UploadImageOptions
): Promise<ApiResponse<string>> {
  try {
    // 1. signed URL 발급
    const supabase = await createClient();
    const { path, token } = await getSignedUploadUrl(
      bucketName,
      options.filename,
      options.folder,
      options.subfolder
    );

    // 2. signed URL로 업로드
    const { data, error } = await supabase.storage
      .from(bucketName)
      .uploadToSignedUrl(path, token, file);

    if (error) throw new Error('업로드 실패');
    return { success: true, data: data?.fullPath };
  } catch (error) {
    console.error('Image upload failed:', error);
    return { success: false, msg: ' 이미지 업로드 실패' };
  }
}

/* 다중 이미지 업로드 */
type UploadMultipleImagesOptions = {
  files: Blob[];
  bucketName: StorageBucket;
  folder?: string;
  subfolder?: string;
};

export async function uploadMultipleImages({
  files,
  bucketName,
  folder,
  subfolder,
}: UploadMultipleImagesOptions): Promise<ApiResponse<string[]>> {
  try {
    const me = await getUser();
    if (!me) throw new Error('유저 없음');
    if (files.length === 0) return { success: true, data: [] };

    const supabase = await createClient();
    // 1. 업로드할 파일 경로 생성
    const fileNames = files.map((_, i) => {
      const filename = `${i}.webp`;
      return [me.user_id, folder, subfolder, filename].filter(Boolean).join('/');
    });

    // 2. Signed URL 목록 발급
    const signedUrlsResult = await getMultipleSignedUploadUrls(bucketName, fileNames);
    if (!signedUrlsResult.success) {
      throw new Error(signedUrlsResult.msg);
    }
    const signedUrlsData = signedUrlsResult.data;

    const limit = pLimit(3);

    // 3. Signed URL에 이미지 업로드
    const uploadPromises = files.map((file, i) =>
      limit(async () => {
        const { path, token } = signedUrlsData[i];
        const { data, error } = await supabase.storage
          .from(bucketName)
          .uploadToSignedUrl(path, token, file);

        if (error) throw new Error(`파일 업로드 실패: ${fileNames[i]}`);
        return data?.fullPath;
      })
    );

    const urls = await Promise.all(uploadPromises);

    return { success: true, data: urls };
  } catch (error) {
    console.error('다중 이미지 업로드 실패:', error);
    return { success: false, msg: '이미지 업로드 중 오류가 발생했습니다.' };
  }
}

/* 썸네일 업로드 */
export async function uploadThumbnail(thumbnail: Blob, logId: string) {
  return await uploadImageToSupabase('thumbnails', thumbnail, {
    folder: logId,
    filename: `${logId}.webp`,
  });
}

/* 장소 이미지 업로드 */
export async function uploadPlaces(places: LogFormValues['places'], logId: string) {
  const placeDataList: NewPlace[] = [];
  const placeImageDataList: NewPlaceImage[] = [];

  const uploadTasks = places.map(
    async ({ placeName, description, location, category, placeImages }, idx) => {
      const placeId = crypto.randomUUID();
      const files = placeImages.map((img) => img.file); // 이미지 파일 목록

      // 장소 데이터 생성
      placeDataList.push({
        place_id: placeId,
        log_id: logId,
        name: placeName,
        description,
        address: location,
        category,
        order: idx + 1,
      });

      try {
        const uploadResult = await retryUpload(() =>
          uploadMultipleImages({
            files,
            bucketName: 'places',
            folder: logId,
            subfolder: placeId,
          })
        );

        if (!uploadResult.success) {
          console.error(`❌ 장소 이미지 업로드 실패 (${placeName}):`, uploadResult.msg);
          throw new Error(uploadResult.msg || '장소 이미지 업로드 실패');
        }

        const uploadedImages = uploadResult.data.map((url, i) => ({
          image_path: url,
          order: placeImages[i].order,
          place_id: placeId,
        }));
        placeImageDataList.push(...uploadedImages);
      } catch (err) {
        console.error(`❌ 장소 "${placeName}" 업로드 재시도 후 실패:`, err);
        throw err;
      }
    }
  );

  await Promise.all(uploadTasks);

  return { placeDataList, placeImageDataList };
}

/* 비동기 작업 재시도 */
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

async function retryUpload<T>(taskFn: () => Promise<T>): Promise<T> {
  let attempt = 0; // 재시도 횟수
  while (attempt <= MAX_RETRIES) {
    try {
      return await taskFn();
    } catch (error) {
      attempt++;
      if (attempt > MAX_RETRIES) throw error;
      console.warn(`재시도 (${attempt}/${MAX_RETRIES})`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
    }
  }
  throw new Error('업로드 실패');
}
