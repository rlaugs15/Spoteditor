'use client';

import { cityDistricts } from '@/constants/cityData';
import CitySearchButton from './CitySearchButton';

interface SigunguButtonListProps {
  city: string;
  onSigunguClick: (bname: string) => void;
}

export default function SigunguButtonList({ city, onSigunguClick }: SigunguButtonListProps) {
  if (!city || !cityDistricts[city]) return null;
  return (
    <>
      {cityDistricts[city].map((sigungu) => (
        <CitySearchButton key={sigungu} city={sigungu} onClick={() => onSigunguClick(sigungu)} />
      ))}
    </>
  );
}
