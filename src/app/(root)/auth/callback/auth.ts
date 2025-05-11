import { SupabaseClient } from '@supabase/supabase-js';
import { prisma } from '../../../../../prisma/prisma';

export async function upsertGoogleUser(supabase: SupabaseClient<any, 'public', any>) {
  /* 로그인된 유저 정보 가져오기 (auth.users 기준) */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;
  const {
    id,
    email,
    app_metadata: { provider },
    user_metadata: { full_name, avatar_url },
  } = user;

  /* public_users에 해당 유저가 존재하는지 확인 */
  const existingUser = await prisma.public_users.findUnique({
    where: { user_id: id },
  });

  if (existingUser) return;

  /* 존재하지 않으면 최초 로그인으로 판단 → public_users에 유저 정보 저장 */
  await prisma.public_users.create({
    data: {
      user_id: id,
      email,
      nickname: full_name,
      image_url: avatar_url,
      description: null,
      insta_id: null,
      provider,
      is_deleted: false,
    },
  });
}
