import { getSignedUploadUrl } from '@/app/actions/storage';
import {
  generateFilePaths,
  GenerateFilePathsOptions,
} from '@/app/actions/utils/genertateFilePaths';
import { createClient } from '@/lib/supabase/client';
import { ApiResponse } from '@/types/api/common';
import { StorageBucket } from '@/types/api/storage';
import { LogFormValues, NewPlace, NewPlaceImage } from '@/types/log';
import { performanceMonitor } from './performanceMonitor';
// ===================================================================
// 단일 이미지 업로드 (signed URL 방식)
// ===================================================================
export async function uploadSingleImage(
  bucketName: StorageBucket,
  file: Blob,
  options: GenerateFilePathsOptions
): Promise<ApiResponse<string>> {
  try {
    // 1. signed URL 발급
    const supabase = await createClient();
    const [filePath] = await generateFilePaths(options);
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

// ===================================================================
// 다중 이미지 업로드
// ===================================================================

type UploadMultipleImagesOptions = {
  files: Blob[];
  bucketName: StorageBucket;
  folders?: string[];
  retryAttempts?: number;
  retryDelay?: number;
};

/* Signed URL 방식 */
// export async function uploadMultipleImages({
//   files,
//   bucketName,
//   folders,
// }: UploadMultipleImagesOptions): Promise<ApiResponse<string[]>> {
//   try {
//     const supabase = await createClient();

//     const filePaths = await generateFilePaths({
//       folders,
//       fileCount: files.length,
//     });

//     const signedUrlsResult = await getMultipleSignedUploadUrls(bucketName, filePaths); // 서버에서 실행
//     if (!signedUrlsResult.success) throw new Error(signedUrlsResult.msg);

//     const signedUrlsData = signedUrlsResult.data;

//     const limit = pLimit(5);
//     // console.time('🐠 Signed URL에 이미지 업로드');
//     const uploadPromises = files.map((file, idx) =>
//       limit(async () => {
//         const { path, token } = signedUrlsData[idx];
//         const { data, error } = await supabase.storage
//           .from(bucketName)
//           .uploadToSignedUrl(path, token, file);
//         if (error) throw new Error(`파일 업로드 실패: ${path}`);
//         return data?.fullPath;
//       })
//     );
//     const urls = await Promise.all(uploadPromises);
//     // console.timeEnd('🐠 Signed URL에 이미지 업로드');
//     return { success: true, data: urls };
//   } catch (error) {
//     console.error('다중 이미지 업로드 실패:', error);
//     return { success: false, msg: '이미지 업로드 중 오류가 발생했습니다.' };
//   }
// }

/* Direct Upload 방식 */
export async function uploadMultipleImagesOptimized({
  files,
  bucketName,
  folders,
  retryAttempts = 3, // 재시도 횟수
  retryDelay = 1000, // 재시도 간격 (ms)
}: UploadMultipleImagesOptions): Promise<ApiResponse<string[]>> {
  try {
    const supabase = await createClient();
    const filePaths = await generateFilePaths({
      folders,
      fileCount: files.length,
    });

    performanceMonitor.start('🚀 Direct Upload로 이미지 업로드');

    // 재시도 로직이 포함된 업로드 함수
    const uploadWithRetry = async (file: Blob, filePath: string, attempt = 1): Promise<string> => {
      try {
        const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
          cacheControl: '3600',
          upsert: false, // 중복 방지
        });

        if (error) {
          throw new Error(`업로드 실패: ${filePath} - ${error.message}`);
        }

        return data?.fullPath || '';
      } catch (error) {
        if (attempt < retryAttempts) {
          console.warn(`업로드 재시도 ${attempt}/${retryAttempts}: ${filePath}`);
          await new Promise((resolve) => setTimeout(resolve, retryDelay * attempt));
          return uploadWithRetry(file, filePath, attempt + 1);
        }
        throw error;
      }
    };

    // 배치 처리로 업로드 진행
    const batchSize = 10; // 한 번에 처리할 파일 수
    const results: string[] = [];

    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      const batchPaths = filePaths.slice(i, i + batchSize);

      // 배치 내에서 모든 파일을 동시에 업로드
      const batchPromises = batch.map((file, idx) => uploadWithRetry(file, batchPaths[idx]));

      const batchResults = await Promise.allSettled(batchPromises);

      // 배치 결과 처리
      batchResults.forEach((result, idx) => {
        if (result.status === 'fulfilled') {
          results.push(result.value);
        } else {
          console.error(`배치 ${i + idx} 업로드 실패:`, result.reason);
          throw new Error(`배치 업로드 실패: ${result.reason}`);
        }
      });

      // 배치 간 간격 (서버 부하 분산)
      if (i + batchSize < files.length) {
        await new Promise((resolve) => setTimeout(resolve, 200)); // 간격 단축
      }
    }

    performanceMonitor.end('🚀 Direct Upload로 이미지 업로드');
    return { success: true, data: results };
  } catch (error) {
    console.error('다중 이미지 업로드 실패:', error);
    return { success: false, msg: '이미지 업로드 중 오류가 발생했습니다.' };
  }
}

// ===================================================================
// 장소 이미지 업로드 (개선된 버전)
// ===================================================================

/* 장소 이미지 업로드 - Signed URL 방식 */
// export async function uploadPlaces(
//   places: LogFormValues['places'],
//   logId: string,
//   existingOrderCount = 0
// ) {
//   const placeDataList: NewPlace[] = places.map(
//     ({ placeName, description, location, category }, idx) => ({
//       place_id: crypto.randomUUID(),
//       log_id: logId,
//       name: placeName,
//       description,
//       address: location,
//       category,
//       order: existingOrderCount + idx + 1, // 로그 수정에서 새로운 장소추가할 때, 마지막 번호 다음부터 시작
//     })
//   );
//   const placeImageDataList: NewPlaceImage[] = [];

//   const uploadTasks = places.map(async (place, idx) => {
//     const placeId = placeDataList[idx].place_id;
//     const files = place.placeImages.map((img) => img.file);

//     try {
//       const uploadResult = await uploadMultipleImages({
//         files,
//         bucketName: 'places',
//         folders: [logId, placeId],
//       });

//       if (!uploadResult.success) {
//         console.error(`❌ 장소 이미지 업로드 실패 (${place.placeName}):`, uploadResult.msg);
//         throw new Error(uploadResult.msg || '장소 이미지 업로드 실패');
//       }

//       const uploadedImages = uploadResult.data.map((url, idx) => ({
//         image_path: url,
//         order: idx + 1,
//         place_id: placeId,
//       }));
//       placeImageDataList.push(...uploadedImages);
//     } catch (err) {
//       console.error(`❌ 장소 "${place.placeName}" 업로드 재시도 후 실패:`, err);
//       throw err;
//     }
//   });

//   await Promise.all(uploadTasks);
//   return { placeDataList, placeImageDataList };
// }

/* 장소 이미지 업로드 - Direct Upload 방식 */
export async function uploadPlacesOptimized(
  places: LogFormValues['places'],
  logId: string,
  existingOrderCount = 0
) {
  // 1. 장소 메타 데이터 생성
  const { placeDataList, placeImageDataList } = makePlaceAndImageDataList(
    places,
    logId,
    existingOrderCount
  );

  // 2. 모든 이미지 파일을 하나의 배열로 수집
  // console.log('places', places);
  const allFiles = places.flatMap((place) => place.placeImages.map((img) => img.file));
  // console.log('allFiles', allFiles);
  try {
    // 3. 모든 이미지를 한 번에 업로드
    const uploadResult = await uploadMultipleImagesOptimized({
      files: allFiles,
      bucketName: 'places',
      folders: [logId],
    });

    if (!uploadResult.success) {
      throw new Error(uploadResult.msg || '장소 이미지 업로드 실패');
    }

    // console.log('uploadResult', uploadResult);
    // 4. 업로드된 이미지들을 장소별로 분류
    const uploadedUrls = uploadResult.data;
    let urlIndex = 0;

    places.forEach((place, placeIdx) => {
      const placeId = placeDataList[placeIdx].place_id;
      const imageCount = place.placeImages.length;

      // 해당 장소의 이미지들만 추출
      const placeImages = uploadedUrls.slice(urlIndex, urlIndex + imageCount);

      // 장소 이미지 메타 데이터 생성
      const uploadedImages = placeImages.map((url, idx) => ({
        place_id: placeId,
        image_path: url,
        order: idx + 1,
      }));

      placeImageDataList.push(...uploadedImages);
      urlIndex += imageCount;
    });

    return { placeDataList, placeImageDataList };
  } catch (error) {
    console.error('장소 이미지 업로드 실패:', error);
    throw error;
  }
}

function makePlaceAndImageDataList(
  places: LogFormValues['places'],
  logId: string,
  existingOrderCount = 0
) {
  const placeDataList: NewPlace[] = places.map(
    ({ placeName, description, location, category }, idx) => ({
      place_id: crypto.randomUUID(),
      log_id: logId,
      name: placeName,
      description,
      address: location,
      category,
      order: existingOrderCount + idx + 1, // 로그 수정에서 새로운 장소추가할 때, 마지막 번호 다음부터 시작
    })
  );

  const placeImageDataList: NewPlaceImage[] = [];
  return { placeDataList, placeImageDataList };
}
