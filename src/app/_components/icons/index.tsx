'use client';

import Image from 'next/image';

interface IconProps {
  className?: string;
}

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
