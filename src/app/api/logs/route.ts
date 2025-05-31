import { getLogs } from '@/app/actions/log';
import { ERROR_CODES } from '@/constants/errorCode';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userIdParam = searchParams.get('userId');
  const userId = userIdParam && userIdParam !== 'null' ? userIdParam : undefined;
  const currentPage = parseInt(searchParams.get('currentPage') || '1');
  const pageSize = parseInt(searchParams.get('pageSize') || '10');

  try {
    const result = await getLogs({ userId, currentPage, pageSize });

    if (!result.success) {
      return NextResponse.json(result, {
        status: 404,
      });
    }

    return NextResponse.json(result, {
      status: result.meta?.httpStatus ?? 200,
    });
  } catch (_error) {
    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.LOG.LIST_EMPTY,
        errorCode: ERROR_CODES.LOG.LIST_EMPTY,
      },
      { status: 500 }
    );
  }
}
