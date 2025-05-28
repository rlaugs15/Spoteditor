import Header from '@/components/common/Header';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import Image from 'next/image';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="h-dvh flex flex-col">
      <Header />
      <div className="flex flex-col items-center justify-center grow gap-[50px]">
        <Image src={'/images/404.png'} width={250} height={250} alt="3404" />

        <div className="flex flex-col justify-center items-center ">
          <h3 className="font-bold text-text-2xl">찾으시는 페이지를 찾을 수 없습니다.</h3>
          <p className="text-text-lg">URL 주소를 확인해주세요.</p>

          <Button className="rounded-full mt-5" asChild>
            <Link href={HOME}>홈으로 이동</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
