'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Error({ error }: { error: Error }) {
  console.log('eror', error);

  return (
    <main className="flex flex-col items-center justify-center h-dvh grow">
      <div className="relative w-[275.17px] h-[250px]">
        <Image
          src="/NotFound.png"
          alt="notFound 이미지"
          fill
          priority
          className="object-contain object-center"
        />
      </div>
      <div className="flex flex-col mt-[50px] mb-5">
        <h4 className="text-text-xl font-bold">찾으시는 페이지를 찾을 수 없습니다.</h4>
        <h5 className="text-center">{error.message || 'URL 주소를 확인해주세요.'}</h5>
      </div>
      <Button size={'xl'}>
        <Link href="/">홈으로 이동</Link>
      </Button>
    </main>
  );
}
