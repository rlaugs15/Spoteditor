import { getLogs } from '@/app/actions/log';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get('userId');
  const userId = userIdParam && userIdParam !== 'null' ? userIdParam : undefined;
  const currentPage = parseInt(searchParams.get('currentPage') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  const logs = await getLogs({ userId, currentPage, pageSize });

  if (!logs) {
    return NextResponse.json({ success: false, msg: '서버 오류로 조회 실패' }, { status: 500 });
  }

  return NextResponse.json(logs, { status: 200 });
}
