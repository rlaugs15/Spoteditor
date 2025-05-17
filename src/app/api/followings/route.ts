import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../prisma/prisma';

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

    const followings = await prisma.follow.findMany({
      where: {
        follower_id: userId, // 내가 팔로우한 사람
      },
      skip, // 앞에서 몇 개 건너뛸지
      take: pageSize, // 가져올 데이터 수 (LIMIT 역할)
      select: {
        users_follow_following_idTousers: {
          select: {
            user_id: true,
            nickname: true,
            image_url: true,
          },
        },
      },
    });

    // 전체 팔로잉 수 카운트 (페이지 수 계산에 사용)
    const totalCount = await prisma.follow.count({
      where: {
        follower_id: userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: followings.map((following) => following.users_follow_following_idTousers),
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
        msg: '팔로잉 목록을 불러오는 중 오류가 발생했습니다.',
      },
      { status: 500 }
    );
  }
}
