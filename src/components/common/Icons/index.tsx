import Image from 'next/image';

interface IconProps {
  className?: string;
}

/* Header */
export const SearchIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/search.svg" width={24} height={24} alt="검색 아이콘" className={className} />
  );
};
export const GlobeIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/globe.svg"
      width={24}
      height={24}
      alt="다국어 아이콘"
      className={className}
    />
  );
};
export const AlertIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/alert.svg" width={24} height={24} alt="알림 아이콘" className={className} />
  );
};
export const UserIcon = ({ className }: IconProps) => {
  return (
    <Image src="/icons/user.svg" width={24} height={24} alt="유저 아이콘" className={className} />
  );
};
