'use server';
import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/types/api/common';
import type { FileObject } from '@supabase/storage-js';
import { StorageBucket } from '../../types/api/storage';

/* 단일 Signed upload URL 발급 */
export async function getSignedUploadUrl(
  bucketName: StorageBucket,
  filePath: string,
  maxRetry: number = 3,
  delayMs: number = 1000
) {
  let lastError: any;
  for (let attempt = 1; attempt <= maxRetry; attempt++) {
    const supabase = await createClient();
    const { data, error } = await supabase.storage.from(bucketName).createSignedUploadUrl(filePath);

    if (!error && data) return data;

    lastError = error;
    console.error(`PreSigned URL 생성 실패 (시도 ${attempt}/${maxRetry}): ${error?.message}`);
    if (attempt < maxRetry) await new Promise((res) => setTimeout(res, delayMs * attempt)); // 서버 과부화 방지로 재시도 사이에 점진적으로 대기
  }

  throw new Error(`PreSigned URL 생성 실패 (최대 재시도 ${maxRetry}회): ${lastError?.message}`);
}

/* SignedURLs  */
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

type SignedUploadResult = { token: string; path: string };
type FailedResult = { path: string; error: unknown; batchNumber: number };

export async function getMultipleSignedUploadUrls(
  bucketName: StorageBucket,
  filePaths: string[],
  batchSize = 3
): Promise<ApiResponse<SignedUploadResult[]>> {
  console.time('✏️ 다중 이미지 SignedURL 발급');
  const allResults: SignedUploadResult[] = [];
  const allFailed: FailedResult[] = [];
  const failedBatches: { batchNumber: number; error: unknown; batch: string[] }[] = [];

  const processBatch = async (batch: string[], batchNumber: number) => {
    console.log(`🔄 배치 ${batchNumber} 처리 시작 (${batch.length}개 파일)`);
    try {
      const results = await Promise.allSettled(
        batch.map((path) => getSignedUploadUrl(bucketName, path))
      );

      const successful = results.filter((r) => r.status === 'fulfilled').map((r) => r.value);

      const failed = results
        .filter((r) => r.status === 'rejected')
        .map((r, idx) => ({
          path: batch[idx],
          error: r.reason,
          batchNumber,
        }));

      allResults.push(...successful);
      allFailed.push(...failed);

      console.log(
        `✅ 배치 ${batchNumber} 완료: 성공 ${successful.length}개, 실패 ${failed.length}개`
      );
    } catch (batchError) {
      console.error(`❌ 배치 ${batchNumber} 전체 실패:`, batchError, batch);
    }
  };

  try {
    for (let i = 0; i < filePaths.length; i += batchSize) {
      const batch = filePaths.slice(i, i + batchSize);
      const batchNumber = Math.floor(i / batchSize) + 1;

      await processBatch(batch, batchNumber); // 배치단위로, signed url 발급

      if (i + batchSize < filePaths.length) await delay(200);
    }

    if (allFailed.length > 0) console.warn('❗ 일부 Signed URL 발급 실패:', allFailed);
    if (failedBatches.length > 0) {
      console.error(
        '❌ 실패한 배치 요약:',
        failedBatches.map((b) => ({ batchNumber: b.batchNumber, error: b.error, files: b.batch }))
      );
    }
    console.timeEnd('✏️ 다중 이미지 SignedURL 발급');

    return { success: true, data: allResults };
  } catch (err) {
    console.error('❌ Signed URL 전체 발급 실패:', err);
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
