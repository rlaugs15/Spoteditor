// app/api/reverse-geocode/route.ts
import { ERROR_CODES } from '@/constants/errorCode';
import { ERROR_MESSAGES } from '@/constants/errorMessages';
import { NextResponse } from 'next/server';

// 지원 언어만 제한적으로 허용 (next-intl 기준)
const SUPPORTED_LANGUAGES = ['ko', 'en'] as const;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const locale = searchParams.get('locale');

  //위경도 값이 없을 경우
  if (!lat || !lng) {
    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.COMMON.COORDINATES_REQUIRED,
        errorCode: ERROR_CODES.COMMON.COORDINATES_REQUIRED,
      },
      { status: 400 }
    );
  }

  //apiKey가 없을 경우
  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.COMMON.INTERNAL_SERVER_ERROR,
        errorCode: ERROR_CODES.COMMON.INTERNAL_SERVER_ERROR,
      },
      { status: 500 }
    );
  }

  const language = SUPPORTED_LANGUAGES.includes(locale as any) ? locale : 'en';

  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}&language=${language}&pretty=0`;
    const response = await fetch(url);
    const result = await response.json();

    //좌표에 해당하는 주소를 찾을 수 없을 경우
    if (!response.ok || !result?.results?.length) {
      return NextResponse.json(
        {
          success: false,
          msg: ERROR_MESSAGES.PLACE.NO_ADDRESS_FOUND,
          errorCode: ERROR_CODES.PLACE.NO_ADDRESS_FOUND,
        },
        { status: 404 }
      );
    }

    /* 주소의 구성 요소를 나눈 정보. 각 필드는 선택적으로 포함됨 */
    /* const components = result.results[0].components;
    const address = `${components.road}, ${components.city}, ${components.state}`; */

    /* 사람이 읽기 쉬운 방식으로 정리된 전체 주소 문자열 */
    const formatted = result.results[0].formatted;

    return NextResponse.json(
      {
        success: true,
        data: { address: formatted },
        meta: { httpStatus: 200 },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('reverse-geocode 오류:', error);

    return NextResponse.json(
      {
        success: false,
        msg: ERROR_MESSAGES.PLACE.REVERSE_GEOCODE_FAILED,
        errorCode: ERROR_CODES.PLACE.REVERSE_GEOCODE_FAILED,
      },
      { status: 500 }
    );
  }
}
