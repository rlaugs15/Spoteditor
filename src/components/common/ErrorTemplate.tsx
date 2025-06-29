'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
interface ErrorTemplateProps {
  title?: string;
  message?: string;
}

export default function ErrorTemplate({
  title = '찾으시는 페이지를 찾을 수 없습니다.',
  message = 'URL 주소를 확인해주세요.',
}: ErrorTemplateProps) {
  const router = useRouter();
  const t = useTranslations('NotFoundPage');
  const handleClick = () => router.replace('/');
  return (
    <main className="flex flex-col items-center justify-center h-dvh grow">
      <Image src="/images/404.png" alt="404" width={300} height={200} />
      <div className="flex flex-col items-center mt-[50px] mb-5">
        <h4 className="text-text-xl font-bold">{title ?? t('title')}</h4>
        <h5 className="text-center">{message ?? t('defaultMessage')}</h5>
      </div>
      <Button className="rounded-full mt-5" size={'lg'} onClick={handleClick}>
        홈으로 이동
      </Button>
    </main>
  );
}
