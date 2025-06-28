import { getLog } from '@/app/actions/log';
import { ERROR_CODES } from '@/constants/errorCode';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const logId = searchParams.get('logId');

  if (!logId) {
    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.LOG.MISSING_ID,
        errorCode: ERROR_CODES.LOG.MISSING_ID,
      },
      { status: 400 }
    );
  }

  try {
    const result = await getLog(logId);

    if (!result.success) {
      return NextResponse.json(result, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
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
