import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/app/actions/user';
import { prisma } from '../../../../../../prisma/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('placeId');
  const me = await getUser();

  if (!me) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 401 });
  }
  if (!placeId) {
    return NextResponse.json({ success: false, msg: '장소 id가 필요합니다.' }, { status: 400 });
  }

  const placeBookmark = await prisma.place_bookmark.findFirst({
    where: {
      user_id: me?.user_id,
      place_id: BigInt(placeId),
    },
  });

  return NextResponse.json(
    {
      success: !!placeBookmark,
      msg: placeBookmark ? '북마크되어 있음' : '북마크되어 있지 않음',
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('placeId');
  const me = await getUser();

  if (!me) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 401 });
  }

  if (!placeId) {
    return NextResponse.json({ success: false, msg: '장소 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    await prisma.place_bookmark.create({
      data: {
        user_id: me.user_id,
        place_id: BigInt(placeId),
      },
    });

    return NextResponse.json({ success: true, isBookmark: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, msg: '서버 오류로 북마크 실패' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const placeId = searchParams.get('placeId');
  const me = await getUser();

  if (!me) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 401 });
  }

  if (!placeId) {
    return NextResponse.json({ success: false, msg: '장소 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const deleted = await prisma.place_bookmark.deleteMany({
      where: {
        user_id: me.user_id,
        place_id: BigInt(placeId),
      },
    });

    return NextResponse.json(
      {
        success: deleted.count > 0,
        isBookmark: false,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: '서버 오류로 북마크 취소 실패' },
      { status: 500 }
    );
  }
}
