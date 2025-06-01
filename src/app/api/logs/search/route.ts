import { getSearchLogs } from '@/app/actions/log';
import { ERROR_CODES } from '@/constants/errorCode';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const keyword = searchParams.get('keyword') || '';
  const city = searchParams.get('city') || undefined;
  const sigungu = searchParams.get('sigungu') || undefined;
  const currentPage = parseInt(searchParams.get('currentPage') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  try {
    const result = await getSearchLogs({
      keyword,
      city,
      sigungu,
      currentPage,
      pageSize,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.SEARCH.FAILED,
        errorCode: ERROR_CODES.SEARCH.FAILED,
      },
      { status: 500 }
    );
  }
}
