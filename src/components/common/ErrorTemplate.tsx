interface ErrorTemplateProps {
  title?: string;
  message?: string;
}

import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import Image from 'next/image';
import Link from 'next/link';

export default function ErrorTemplate({
  title = '찾으시는 페이지를 찾을 수 없습니다.',
  message = 'URL 주소를 확인해주세요.',
}: ErrorTemplateProps) {
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
        <h4 className="text-text-xl font-bold">{title}</h4>
        <h5 className="text-center">{message}</h5>
      </div>
      <Button className="rounded-full mt-5" asChild>
        <Link href={HOME}>홈으로 이동</Link>
      </Button>
    </main>
  );
}
