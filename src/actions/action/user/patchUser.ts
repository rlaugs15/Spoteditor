'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '../../../../prisma/prisma';
import { cacheTags } from '../../fetch/tags';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface PatchUserProps {
  userId: string;
  nickname?: string | null;
  image_url?: string | null;
  insta_id?: string | null;
  description?: string | null;
}

export async function patchUser({
  userId,
  nickname,
  image_url,
  insta_id,
  description,
}: PatchUserProps) {
  try {
    // undefined로 전달된 필드는 무시되어, 해당 컬럼은 db로 전송되지 않아 수정되지 않음
    const updated = await prisma.public_users.update({
      where: { user_id: userId },
      data: {
        nickname,
        image_url,
        insta_id,
        description,
      },
    });

    revalidateTag(cacheTags.user);
    return updated;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      console.warn(`유저 수정 실패: 유저가 존재하지 않음 (${userId})`);
      return null;
    }
    throw error;
  }
}
