'use client';

import Image from 'next/image';

interface SocialLoginButtonProps {
  imgSrc: string;
  alt: string;
}
/* w-auto h-12.5 */
export default function SocialLoginButton({ imgSrc, alt }: SocialLoginButtonProps) {
  return (
    <button className="px-1 py-0 w-[329px] h-12.5 relative hover:cursor-pointer">
      <Image src={imgSrc} alt={alt} fill className="object-contain" />
    </button>
  );
}
