'use server';

import { createClient } from '@/lib/supabase/server';
import { ApiResponse } from '@/types/api/common';
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

/* SignedURL 발급 받기 */
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

/* signedUrl로 이미지 업로드 */
type UploadImageOptions = {
  folder?: string;
  subfolder?: string;
  filename: string;
};

/* 단일 이미지 업로드 */
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

    // 3. Signed URL에 이미지 업로드
    const uploadPromises = files.map(async (file, i) => {
      const { path, token } = signedUrlsData[i];

      const { data, error } = await supabase.storage
        .from(bucketName)
        .uploadToSignedUrl(path, token, file);

      if (error) throw new Error(`파일 업로드 실패: ${fileNames[i]}`);

      return data?.fullPath;
    });

    const urls = await Promise.all(uploadPromises);

    return { success: true, data: urls };
  } catch (error) {
    console.error('다중 이미지 업로드 실패:', error);
    return { success: false, msg: '이미지 업로드 중 오류가 발생했습니다.' };
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
  const { data: files, error: listError } = await supabase.storage
    .from(bucket)
    .list(userFolder + '/');

  if (listError) {
    console.warn('폴더 내 파일 목록 조회 실패');
    return;
  }

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
