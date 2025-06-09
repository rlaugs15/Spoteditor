'use server';

import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/types/api/common';
import type { FileObject } from '@supabase/storage-js';
import { StorageBucket } from '../../types/api/storage';
import { getUser } from './user';

/*
 * 스토리지에 파일 직접 업로드
 * profiles/userId/profile.webp
 * thumbnails/userId/${logId}.webp
 * placess/logId/userId/placeId/...
 */
export async function uploadFile(
  bucketName: StorageBucket,
  file: Blob,
  options?: {
    folder?: string;
    subfolder?: string;
    filename: string;
  }
) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) throw new Error('유저 없음');

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${user.id}/${options?.folder}/${options?.subfolder}/${options?.filename}`, file, {
        upsert: bucketName === 'profiles',
      });

    if (data) return { success: true, fullPath: data.fullPath };
    if (error) throw error;
  } catch (e) {
    console.error(e);
    return { success: false, msg: `${options?.filename} 파일 업로드에 실패했습니다.` };
  }
}

/* Signed upload URL 발급 받기 */
export async function getSignedUploadUrl(
  bucketName: StorageBucket,
  filename: string,
  folder?: string,
  subfolder?: string
) {
  const me = await getUser();
  if (!me) throw new Error('유저 없음');

  const path = [me.user_id, folder, subfolder, filename].filter(Boolean).join('/');

  const supabase = await createClient();
  const { data, error } = await supabase.storage.from(bucketName).createSignedUploadUrl(path); //만료시간 고정 2시간 (수정 불가)

  if (error || !data) {
    throw new Error('PreSigned URL 생성 실패');
  }

  return { ...data, path }; // signedUrl, path
}

/* SignedURLs  */
export async function getMultipleSignedUploadUrls(
  bucketName: StorageBucket,
  filePaths: string[]
): Promise<ApiResponse<{ token: string; path: string }[]>> {
  try {
    const supabase = await createClient();
    const results: { token: string; path: string }[] = [];

    for (const path of filePaths) {
      const { data, error } = await supabase.storage.from(bucketName).createSignedUploadUrl(path);

      if (error || !data) {
        console.error(`Signed upload URL 생성 실패:`, error);
        return { success: false, msg: 'Signed upload URL 생성 실패' };
      }

      results.push({ token: data.token, path });
    }

    return { success: true, data: results };
  } catch (err) {
    console.error('getMultipleSignedUploadUrls 실패:', err);
    return { success: false, msg: 'Signed upload 처리 중 오류 발생' };
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
  const match = relativePath.match(/^([^/]+)\//); // 첫 번째 경로 조각 추출
  const userFolder = match?.[1];

  if (!userFolder) {
    console.warn('사용자 폴더 경로 추출 실패');
    return;
  }

  const supabase = await createClient();

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
  }
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
