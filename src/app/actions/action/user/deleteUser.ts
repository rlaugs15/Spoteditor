'use server';

import { revalidateTag } from 'next/cache';
import { prisma } from '../../../../../prisma/prisma';
import { cacheTags } from '../../../../actions/fetch/tags';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export async function deleteUser(userId: string) {
  try {
    await prisma.public_users.delete({
      where: {
        user_id: userId,
      },
    });

    revalidateTag(cacheTags.user);
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      // 이미 삭제되었거나 존재하지 않는 유저는 조용히 처리
      return;
    }
    // 그 외 예외는 다시 던짐
    throw error;
  }
}
