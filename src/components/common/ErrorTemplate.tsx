import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ErrorImg from '../../../public/images/404.png';
interface ErrorTemplateProps {
  title?: string;
  message?: string;
  onReset?: () => void;
}

export default function ErrorTemplate({
  title = '찾으시는 페이지를 찾을 수 없습니다.',
  message = 'URL 주소를 확인해주세요.',
  onReset,
}: ErrorTemplateProps) {
  const router = useRouter();
  const handleClick = () => {
    if (onReset) {
      onReset(); // error.tsx에서 reset 전달된 경우
    } else {
      router.push('/'); // not-found.tsx 같은 경우엔 직접 이동
    }
  };
  return (
    <main className="flex flex-col items-center justify-center h-dvh grow">
      <Image src={ErrorImg} alt="notFound 이미지" priority />
      <div className="flex flex-col mt-[50px] mb-5">
        <h4 className="text-text-xl font-bold">{title}</h4>
        <h5 className="text-center">{message}</h5>
      </div>
      <Button className="rounded-full mt-5" size={'lg'} onClick={handleClick}>
        홈으로 이동
      </Button>
    </main>
  );
}
