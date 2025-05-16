import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../prisma/prisma';
import { getUser } from '@/app/actions/user';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const logId = searchParams.get('logId');
  const me = await getUser();

  if (!me) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 401 });
  }
  if (!logId) {
    return NextResponse.json({ success: false, msg: '로그 id가 필요합니다.' }, { status: 400 });
  }

  const placeBookmark = await prisma.log_bookmark.findFirst({
    where: {
      user_id: me?.user_id,
      log_id: BigInt(logId),
    },
  });

  return NextResponse.json(
    {
      success: !!placeBookmark,
      isBookmark: !!placeBookmark,
    },
    { status: 200 }
  );
}

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const logId = searchParams.get('logId');
  const me = await getUser();

  if (!me) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 401 });
  }
  if (!logId) {
    return NextResponse.json({ success: false, msg: '로그 id가 필요합니다.' }, { status: 400 });
  }

  let parsedLogId: bigint;
  try {
    parsedLogId = BigInt(logId);
  } catch {
    return NextResponse.json(
      { success: false, msg: '유효하지 않은 로그 ID입니다.' },
      { status: 400 }
    );
  }

  const existing = await prisma.log_bookmark.findFirst({
    where: {
      user_id: me.user_id,
      log_id: parsedLogId,
    },
  });

  if (existing) {
    return NextResponse.json({ success: true, isBookmark: true }, { status: 200 });
  }

  try {
    await prisma.log_bookmark.create({
      data: {
        user_id: me.user_id,
        log_id: parsedLogId,
      },
    });
    return NextResponse.json({ success: true, isBookmark: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, msg: '서버 오류로 북마크 실패' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const logId = searchParams.get('logId');
  const me = await getUser();

  if (!me) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 401 });
  }

  if (!logId) {
    return NextResponse.json({ success: false, msg: '로그 id가 필요합니다.' }, { status: 400 });
  }

  let parsedLogId: bigint;
  try {
    parsedLogId = BigInt(logId);
  } catch {
    return NextResponse.json(
      { success: false, msg: '유효하지 않은 로그 ID입니다.' },
      { status: 400 }
    );
  }

  try {
    const deleted = await prisma.log_bookmark.deleteMany({
      where: {
        user_id: me.user_id,
        log_id: parsedLogId,
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
