'use client';

import { getAddressFromCoords } from '@/utils/getAddressFromCoords';
import exifr from 'exifr';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

interface UseGpsAddressExtractionProps {
  onAddressSet: (address: string) => void;
  currentAddress?: string;
  onSkip?: () => void;
}

export const useGpsAddressExtraction = ({
  onAddressSet,
  currentAddress,
  onSkip,
}: UseGpsAddressExtractionProps) => {
  const locale = useLocale();

  const extractGpsAndSetAddress = async (files: File[]) => {
    // 이미 주소가 있으면 GPS 추출 건너뛰기
    if (currentAddress) {
      onSkip?.();
      return;
    }

    let hasGpsInfo = false;

    for (const file of files) {
      try {
        const gps = await exifr.gps(file);

        if (gps?.latitude && gps?.longitude) {
          hasGpsInfo = true;
          const address = await getAddressFromCoords({
            lat: gps.latitude,
            lng: gps.longitude,
            locale,
          });

          if (address.success) {
            onAddressSet(address.data.address);
            toast.success('GPS 정보로 주소가 자동 설정되었습니다.');
            break; // 첫 번째 성공한 GPS 정보로 주소 설정 후 종료
          } else {
            toast.warning('GPS 정보로 주소를 찾을 수 없습니다.');
          }
        }
      } catch (err) {
        console.error('GPS 추출 중 오류:', err);
      }
    }

    // GPS 정보가 없는 경우 토스트 표시
    if (!hasGpsInfo) {
      toast.info('이미지에서 GPS 정보를 찾을 수 없습니다.');
    }
  };

  return { extractGpsAndSetAddress };
};
