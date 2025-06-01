import { ERROR_CODES } from '@/constants/errorCode';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'prisma/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ success: false, msg: '유저id가 필요합니다.' }, { status: 400 });
    }

    const currentPage = parseInt(searchParams.get('currentPage') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');

    const skip = (currentPage - 1) * pageSize; // 몇 개 건너뛸지 계산 (OFFSET 역할)

    const followers = await prisma.follow.findMany({
      where: {
        following_id: userId, // 나를 팔로우하는 사람
      },
      skip, // 앞에서 몇 개 건너뛸지
      take: pageSize, // 가져올 데이터 수 (LIMIT 역할)
      select: {
        users_follow_follower_idTousers: {
          select: {
            user_id: true,
            nickname: true,
            image_url: true,
          },
        },
      },
    });

    // 전체 팔로워 수 카운트 (페이지 수 계산에 사용)
    const totalCount = await prisma.follow.count({
      where: {
        following_id: userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: followers.map((follower) => follower.users_follow_follower_idTousers),
      meta: {
        pagination: {
          currentPage,
          pageSize,
          totalPages: Math.ceil(totalCount / pageSize),
          totalItems: totalCount,
        },
        httpStatus: 200,
      },
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
        errorCode: ERROR_CODES.COMMON.INTERNAL_SERVER_ERROR,
      },
      { status: 500 }
    );
  }
}
