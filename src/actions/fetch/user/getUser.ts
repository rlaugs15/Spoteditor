import { createClient } from '@/lib/supabase/server';
import { unstable_cache } from 'next/cache';
import { prisma } from '../../../../prisma/prisma';
import { userKeys } from './userKeys';
import { cacheTags } from '../tags';

export async function fetchUserSupabase() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user?.id ?? null;
}

async function fetchUserPrisma(userId: string) {
  try {
    return await prisma.public_users.findUnique({
      where: { user_id: userId },
      select: {
        user_id: true,
        nickname: true,
        image_url: true,
        insta_id: true,
        description: true,
      },
    });
  } catch (error) {
    console.error(`로그인 유저 조회 실패 (${userId})`, error);
    return null;
  }
}

const cacheUser = unstable_cache(
  async (userId: string) => await fetchUserPrisma(userId),
  [...userKeys.me()],
  {
    tags: [cacheTags.user],
    revalidate: false,
  }
);

/* 실제로 사용할 패칭함수 */
export async function getUser() {
  const userId = await fetchUserSupabase();
  if (!userId) return null;
  return cacheUser(userId); // 캐싱된 결과 반환
}
