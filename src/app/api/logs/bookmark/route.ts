import { getBookmarkedLogs } from '@/app/actions/log';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const userId = searchParams.get('userId');
  const currentPage = parseInt(searchParams.get('currentPage') ?? '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') ?? '10', 10);

  if (!userId) {
    return NextResponse.json({ success: false, msg: '로그인이 필요합니다.' }, { status: 400 });
  }

  try {
    const result = await getBookmarkedLogs({ userId, currentPage, pageSize });
    return NextResponse.json(result, { status: result.meta?.httpStatus ?? 200 });
  } catch (_error) {
    return NextResponse.json({ success: false, msg: '서버 오류로 조회 실패' }, { status: 500 });
  }
}
