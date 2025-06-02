import { getPublicUser } from '@/app/actions/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ success: false, msg: 'userId 누락' }, { status: 400 });
  }

  try {
    const user = await getPublicUser(userId);
    return NextResponse.json({ user });
  } catch (_error) {
    console.error(_error);
    return NextResponse.json({ success: false, msg: '유저 조회 실패' }, { status: 500 });
  }
}
