'use server';

import { createClient } from '@/lib/supabase/server';
import { StorageBucket } from '../../types/api/storage';
import { getUser } from './user';

/*
 * 스토리지에 파일 업로드
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

/* PreSigned URL 방식으로 이미지 업로드 */
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
