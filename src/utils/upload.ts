import {
  generateFilePaths,
  getMultipleSignedUploadUrls,
  getSignedUploadUrl,
} from '@/app/actions/storage';
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

export async function uploadSingleImage(
  bucketName: StorageBucket,
  file: Blob,
  options: UploadImageOptions
): Promise<ApiResponse<string>> {
  try {
    // 1. signed URL 발급
    const supabase = await createClient();
    const [filePath] = await generateFilePaths(
      options.folder,
      options.subfolder,
      1,
      options.filename
    );
    const { path, token } = await getSignedUploadUrl(bucketName, filePath);

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
} & Pick<UploadImageOptions, 'folder' | 'subfolder'>;

export async function uploadMultipleImages({
  files,
  bucketName,
  folder,
  subfolder,
}: UploadMultipleImagesOptions): Promise<ApiResponse<string[]>> {
  try {
    const supabase = await createClient();

    // 1. 업로드할 파일 경로 생성
    const filePaths = await generateFilePaths(folder, subfolder, files.length);

    // 2. Signed URL 목록 발급
    const signedUrlsResult = await getMultipleSignedUploadUrls(bucketName, filePaths);
    if (!signedUrlsResult.success) throw new Error(signedUrlsResult.msg);

    const signedUrlsData = signedUrlsResult.data;
    const limit = pLimit(5); // 동시 병렬 작업 5개로 변경

    // 3. Signed URL에 이미지 업로드
    console.time('🐠 Signed URL에 이미지 업로드');
    const uploadPromises = files.map((file, idx) =>
      limit(async () => {
        const { path, token } = signedUrlsData[idx];
        const { data, error } = await supabase.storage
          .from(bucketName)
          .uploadToSignedUrl(path, token, file);
        if (error) throw new Error(`파일 업로드 실패: ${path}`);
        return data?.fullPath;
      })
    );
    const urls = await Promise.all(uploadPromises);
    console.timeEnd('🐠 Signed URL에 이미지 업로드');

    return { success: true, data: urls };
  } catch (error) {
    console.error('다중 이미지 업로드 실패:', error);
    return { success: false, msg: '이미지 업로드 중 오류가 발생했습니다.' };
  }
}

/* 썸네일 업로드 */
export async function uploadThumbnail(thumbnail: Blob, logId: string) {
  return await uploadSingleImage('thumbnails', thumbnail, {
    folder: logId,
    filename: `${logId}.webp`,
  });
}

/* 장소 이미지 업로드 */
export async function uploadPlaces(places: LogFormValues['places'], logId: string) {
  const placeDataList: NewPlace[] = places.map(
    ({ placeName, description, location, category }, idx) => ({
      place_id: crypto.randomUUID(),
      log_id: logId,
      name: placeName,
      description,
      address: location,
      category,
      order: idx + 1,
    })
  );
  const placeImageDataList: NewPlaceImage[] = [];

  const uploadTasks = places.map(async (place, idx) => {
    const placeId = placeDataList[idx].place_id;
    const files = place.placeImages.map((img) => img.file);

    try {
      const uploadResult = await uploadMultipleImages({
        files,
        bucketName: 'places',
        folder: logId,
        subfolder: placeId,
      });

      if (!uploadResult.success) {
        console.error(`❌ 장소 이미지 업로드 실패 (${place.placeName}):`, uploadResult.msg);
        throw new Error(uploadResult.msg || '장소 이미지 업로드 실패');
      }

      const uploadedImages = uploadResult.data.map((url, idx) => ({
        image_path: url,
        order: place.placeImages[idx].order,
        place_id: placeId,
      }));
      placeImageDataList.push(...uploadedImages);
    } catch (err) {
      console.error(`❌ 장소 "${place.placeName}" 업로드 재시도 후 실패:`, err);
      throw err;
    }
  });

  await Promise.all(uploadTasks);
  return { placeDataList, placeImageDataList };
}
