'use client';
import Image from 'next/image';

interface IconProps {
  className?: string;
}

/* Header */
export const SearchIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/search.svg" width={20} height={20} alt="검색 아이콘" className={className} />
  );
};
export const GlobeIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/globe.svg"
      width={20}
      height={20}
      alt="다국어 아이콘"
      className={className}
    />
  );
};
export const AlertIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/alert.svg" width={20} height={20} alt="알림 아이콘" className={className} />
  );
};
export const UserIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/user.svg" width={20} height={20} alt="유저 아이콘" className={className} />
  );
};

/* register header */
export const HomeIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/home.svg" width={20} height={20} alt="홈 아이콘" className={className} />
  );
};

/* log */
export const AddCameraIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/add-camera.svg"
      width={20}
      height={20}
      alt="이미지 추가 아이콘"
      className={className}
    />
  );
};
export const ClockIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/clock.svg" width={20} height={20} alt="시계 아이콘" className={className} />
  );
};
export const LocationIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/location.svg"
      width={20}
      height={20}
      alt="장소 아이콘"
      className={className}
    />
  );
};
export const CircleIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/circle.svg"
      width={20}
      height={20}
      alt="장소 타겟 아이콘"
      className={className}
    />
  );
};
export const CheckedCircleIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/circle-checked.svg"
      width={20}
      height={20}
      alt="선택된 장소 타켓 아이콘"
      className={className}
    />
  );
};
export const TrashIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/trash.svg"
      width={20}
      height={20}
      alt="휴지통 아이콘"
      className={className}
    />
  );
};

/* arrow */
export const ArrowLeftIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/arrow-left.svg"
      width={20}
      height={20}
      alt="왼쪽 화살표 아이콘"
      className={className}
    />
  );
};
export const ArrowUpIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/arrow-up.svg"
      width={20}
      height={20}
      alt="위쪽 화살표 아이콘"
      className={className}
    />
  );
};
export const ArrowDownIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/arrow-down.svg"
      width={20}
      height={20}
      alt="아래쪽 화살표 아이콘"
      className={className}
    />
  );
};
