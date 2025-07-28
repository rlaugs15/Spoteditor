import { SupabaseClient } from '@supabase/supabase-js';
import prisma from 'prisma/prisma';

export async function upsertGoogleUser(supabase: SupabaseClient<any, 'public', any>) {
  /* 로그인된 유저 정보 가져오기 (auth.users 기준) */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  /* public_users에 저장된 유저 정보 조회 (트리거로 자동 삽입된 정보) */
  const userProfile = await prisma.public_users.findUnique({
    where: { user_id: user.id },
  });

  return userProfile;
}
