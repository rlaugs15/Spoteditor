'use client';

import { cityDistricts } from '@/constants/cityData';
import CitySearchButton from './CitySearchButton';

interface SigunguButtonListProps {
  city: string;
  onSigunguClick: (bname: string) => void;
  tRegion: (key: string) => string;
}

export default function SigunguButtonList({
  city,
  onSigunguClick,
  tRegion,
}: SigunguButtonListProps) {
  if (!city || !cityDistricts[city]) return null;
  return (
    <>
      {cityDistricts[city].map((sigungu) => (
        <CitySearchButton
          key={sigungu}
          city={sigungu}
          label={tRegion(sigungu)} // 번역된 이름 보여주기
          onClick={onSigunguClick}
        />
      ))}
    </>
  );
}
