import { getUser } from '@/app/actions/user';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();
    return NextResponse.json({ user });
  } catch (_error) {
    return NextResponse.json({ success: false, msg: '유저 조회 실패' }, { status: 500 });
  }
}
