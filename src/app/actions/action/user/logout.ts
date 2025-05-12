'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidateTag } from 'next/cache';
import { cacheTags } from '../../tags';

export async function logout() {
  const supabase = await createClient();

  try {
    await supabase.auth.signOut();
    // 서버 캐시 무효화
    revalidateTag(cacheTags.user);
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
}
