import { deleteUser, getUser } from '@/app/actions/user';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const user = await getUser();
    return NextResponse.json({ user });
  } catch (_error) {
    console.error(_error);
    return NextResponse.json(
      { success: false, msg: ERROR_MESSAGES.USER.NOT_FOUND },
      { status: 500 }
    );
  }
}

export async function POST() {
  const result = await deleteUser();
  if (!result) {
    // 삭제할 유저가 없거나 이미 삭제된 경우
    return NextResponse.json(
      { success: false, msg: ERROR_MESSAGES.USER.ALREADY_DELETED },
      { status: 404 }
    );
  }

  if (!result.success) {
    if (result.msg === ERROR_MESSAGES.COMMON.UNAUTHORIZED) {
      return NextResponse.json(result, { status: 401 }); // 인증 실패
    }
    return NextResponse.json(result, { status: 500 }); // 기타 서버 오류
  }

  // 성공
  return NextResponse.json(result, { status: 200 });
}
