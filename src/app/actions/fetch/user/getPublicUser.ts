import { unstable_cache } from 'next/cache';
import { prisma } from '../../../../prisma/prisma';
import { cacheTags } from '../../tags';
import { userKeys } from './userKeys';

async function fetchPublicUser(userId: string) {
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
    console.error(`퍼블릭 유저 조회 실패 (${userId})`, error);
    return null;
  }
}

export function getPublicUser(userId: string) {
  return unstable_cache(() => fetchPublicUser(userId), [...userKeys.publicUser(userId)], {
    tags: [cacheTags.publicUser(userId)],
    revalidate: 300,
  });
}
