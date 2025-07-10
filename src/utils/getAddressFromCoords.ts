/**
 * 위도(lat)와 경도(lon)를 기반으로 사용자의 현재 주소(예: 국가, 도시 등)를 가져오는 함수
 * 내부적으로 OpenCage API를 호출하는 `/api/reverse-geocode` 라우트 핸들러와 연동됨
 *
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @param {string} locale - 요청 언어 (예: 'ko', 'en')
 * @returns {Promise<{ address: string }>} 주소 정보를 포함한 객체
 */

import { PhotoMetadataReseponse } from '@/types/api/place';

interface getAddressFromCoordsProps {
  lat: number;
  lng: number;
  locale: string;
}

export async function getAddressFromCoords({
  lat,
  lng,
  locale,
}: getAddressFromCoordsProps): Promise<PhotoMetadataReseponse> {
  const response = await fetch(`/api/reverse-geocode?lat=${lat}&lng=${lng}&locale=${locale}`);
  const result = await response.json();
  return result;
}
