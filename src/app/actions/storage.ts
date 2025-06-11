'use server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/types/api/common';
import type { FileObject } from '@supabase/storage-js';
import { StorageBucket } from '../../types/api/storage';
import { getUser } from './user';

/* 단일 Signed upload URL 발급 */
export async function getSignedUploadUrl(bucketName: StorageBucket, filePath: string) {
  const me = await getUser();
  if (!me) throw new Error('유저 없음');

  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucketName).createSignedUploadUrl(filePath); //만료시간 고정 2시간 (수정 불가)

  if (error) throw new Error('PreSigned URL 생성 실패');
  if (!data) throw new Error('Signed URL 응답 없음 (data가 null)');

  return data;
}

/* SignedURLs  */
export async function getMultipleSignedUploadUrls(
  bucketName: StorageBucket,
  filePaths: string[],
  batchSize = 3
): Promise<ApiResponse<{ token: string; path: string }[]>> {
  try {
    console.time('✏️ 다중 이미지 SignedURL 발급');
    const allResults: { token: string; path: string }[] = [];
    const allFailed: any[] = [];

    // filePaths를 배치 단위로 나누어 처리
    for (let i = 0; i < filePaths.length; i += batchSize) {
      const batch = filePaths.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;
      const totalBatches = Math.ceil(filePaths.length / batchSize);

      console.log(`배치 ${batchNumber}/${totalBatches} 처리 중... (${batch.length}개 파일)`);

      try {
        // 배치 내에서 동시 처리
        const batchResults = await Promise.allSettled(
          batch.map(async (path) => {
            const data = await withRetry(() => getSignedUploadUrl(bucketName, path));
            return { token: data.token, path };
          })
        );

        // 배치 결과 분리
        const batchSuccessful = batchResults
          .filter(
            (r): r is PromiseFulfilledResult<{ token: string; path: string }> =>
              r.status === 'fulfilled'
          )
          .map((r) => r.value);

        const batchFailed = batchResults
          .filter((r) => r.status === 'rejected')
          .map((r, idx) => ({
            path: batch[idx],
            error: r.reason,
            batchNumber,
          }));

        allResults.push(...batchSuccessful);
        allFailed.push(...batchFailed);

        console.log(
          `배치 ${batchNumber} 완료: 성공 ${batchSuccessful.length}개, 실패 ${batchFailed.length}개`
        );

        // 다음 배치 처리 전 잠시 대기 (서버 부하 방지)
        if (i + batchSize < filePaths.length) {
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      } catch (batchError) {
        console.error(`배치 ${batchNumber} 전체 실패:`, batchError);
        // 배치 전체가 실패한 경우 해당 배치의 모든 파일을 실패로 처리
        const batchFailedAll = batch.map((path) => ({
          path,
          error: batchError,
          batchNumber,
        }));
        allFailed.push(...batchFailedAll);
      }
    }

    if (allFailed.length) {
      console.log('실패한 파일들:', allFailed);
    }

    console.timeEnd('✏️ 다중 이미지 SignedURL 발급');
    console.log(`전체 결과: 성공 ${allResults.length}개, 실패 ${allFailed.length}개`);

    return { success: true, data: allResults };
  } catch (err) {
    console.error('getMultipleSignedUploadUrls 실패:', err);
    console.timeEnd('✏️ 다중 이미지 SignedURL 발급');
    return { success: false, msg: 'Signed upload 처리 중 오류 발생' };
  }
}

// 모든 하위 폴더 포함 전체 삭제
export async function deleteAllFilesRecursively(folderPath: string, bucket: StorageBucket) {
  const supabase = await createClient();
  const filesToDelete: string[] = [];

  async function collectFiles(currentPath: string) {
    const { data, error } = await supabase.storage.from(bucket).list(currentPath);
    if (error) {
      console.warn(`"${currentPath}" 파일 목록 조회 실패:`, error.message);
      return;
    }

    for (const item of data) {
      const fullPath = `${currentPath}${item.name}`;
      if (item.name && item.metadata?.mimetype) {
        // 파일
        filesToDelete.push(fullPath);
      } else {
        // 폴더 → 재귀
        await collectFiles(`${fullPath}/`);
      }
    }
  }

  await collectFiles(`${folderPath}/`);

  if (filesToDelete.length === 0) {
    console.log('삭제할 파일 없음');
    return;
  }

  const { error: deleteError } = await supabase.storage.from(bucket).remove(filesToDelete);
  if (deleteError) {
    console.warn('파일 삭제 실패:', deleteError.message);
  } else {
    console.log(`${folderPath} 이하 모든 파일 삭제 완료`);
  }
}

/* 유저 삭제 시 이미지 폴더 삭제 */
export async function deleteProfileStorageFolder(
  imageUrl: string,
  bucket: StorageBucket = 'profiles'
) {
  const publicPrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/`;

  let relativePath: string;

  if (imageUrl.startsWith(publicPrefix)) {
    // 절대 URL인 경우 prefix 제거
    relativePath = imageUrl.replace(publicPrefix, '');
    if (relativePath.startsWith(`${bucket}/`)) {
      relativePath = relativePath.replace(`${bucket}/`, '');
    }
  } else {
    // 상대 경로인 경우 그대로
    relativePath = imageUrl;
  }

  // relativePath 예: 3ff6777e-2516-4207-af10/avatar.webp → 폴더 추출
  const match = relativePath.match(/^([^/]+)\//); // userId 추출
  const userFolder = match?.[1];

  if (!userFolder) {
    console.warn('사용자 폴더 경로 추출 실패');
    return;
  }

  await deleteAllFilesRecursively(userFolder, bucket);

  /* const supabase = await createClient();

  // 1. userId/ 경로 안의 파일들 모두 조회
  const files = await getListAllFilesInFolder(`${userFolder}/`, 'profiles');
  if (!files || files.length === 0) {
    console.log('삭제할 파일 없음 (빈 폴더)');
    return;
  }

  // 2. 전체 경로 문자열 배열 생성
  const paths = files.map((file) => `${userFolder}/${file.name}`);
  // 3. 실제 삭제
  const { error: deleteError } = await supabase.storage.from(bucket).remove(paths);

  if (deleteError) {
    console.warn('프로필 이미지 삭제 실패');
  } else {
    console.log('프로필 폴더 삭제 완료');
  } */
}

export async function getListAllFilesInFolder(folderPath: string, bucket: string) {
  const supabase = await createClient();

  const { data: files, error } = await supabase.storage.from(bucket).list(folderPath);

  if (error) {
    console.warn(`"${folderPath}" 폴더의 파일 목록 조회 실패:`, error.message);
    return null;
  }

  return files;
}

/* 단일 폴더 내 파일 제거 */
export async function deleteFilesInFolder(folderPath: string, files: FileObject[], bucket: string) {
  if (!files || files.length === 0) {
    console.log('삭제할 파일 없음');
    return;
  }

  const supabase = await createClient();

  const paths = files.map((file) => `${folderPath}/${file.name}`);
  const { error } = await supabase.storage.from(bucket).remove(paths);

  if (error) {
    console.warn('Storage 파일 삭제 실패:', error.message);
  } else {
    console.log(`📁 ${folderPath} 내 파일 삭제 완료`);
  }
}

/* 2단계 중첩 폴더 내 파일 삭제 */
export async function deleteNestedFolderFiles(parentFolder: string, bucket: string) {
  const supabase = await createClient();

  // 1단계: logId 하위 placeId 폴더 목록
  const subfolders = await getListAllFilesInFolder(parentFolder, bucket);
  if (!subfolders || subfolders.length === 0) {
    console.log(`"${parentFolder}" 하위 폴더 없음`);
    return;
  }

  const allFilePaths: string[] = [];

  for (const folder of subfolders) {
    if (!folder.name) continue;

    const placeFolderPath = `${parentFolder}/${folder.name}`;
    const files = await getListAllFilesInFolder(placeFolderPath, bucket);
    if (files && files.length > 0) {
      const fullPaths = files.map((file) => `${placeFolderPath}/${file.name}`);
      allFilePaths.push(...fullPaths);
    }
  }

  if (allFilePaths.length > 0) {
    const { error } = await supabase.storage.from(bucket).remove(allFilePaths);
    if (error) {
      console.warn('중첩 폴더 파일 삭제 실패:', error.message);
    } else {
      console.log(`${parentFolder} 이하의 모든 파일 삭제 완료`);
    }
  } else {
    console.log('삭제할 파일 없음');
  }
}

export async function generateFilePaths(
  folder: string | undefined,
  subfolder: string | undefined,
  fileCount: number,
  filename?: string
): Promise<string[]> {
  const me = await getUser();
  if (!me) throw new Error('유저 없음');

  return Array.from({ length: fileCount }).map((_, i) => {
    const resolvedFilename = filename
      ? fileCount === 1
        ? filename
        : `${i}_${filename}`
      : `${i}.webp`;

    return [me.user_id, folder, subfolder, resolvedFilename].filter(Boolean).join('/');
  });
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 2,
  delayMs = 300
): Promise<T> {
  let lastError: any;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      console.log(`${attempt} 시도`);
      return await fn();
    } catch (err) {
      lastError = err;
      console.warn(`재시도 ${attempt + 1}/${maxRetries} 실패:`, err);
      if (attempt < maxRetries - 1) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }

  throw lastError;
}
