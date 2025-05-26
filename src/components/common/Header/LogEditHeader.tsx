import { Button } from '@/components/ui/button';
import BackButton from '../Button/BackButton';

interface LogEditHeaderProps {
  city: string;
  sigungu: string;
}

const LogEditHeader = ({ city, sigungu }: LogEditHeaderProps) => {
  return (
    <header className="py-[15px] bg-white flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <BackButton />
        <p className="text-text-2xl font-bold">
          {city} · {sigungu}
        </p>
      </div>
      <Button
        variant={'ghost'}
        className="font-bold text-text-md !text-error-500"
        onClick={() => console.log('삭제')}
      >
        로그 삭제
      </Button>
    </header>
  );
};

export default LogEditHeader;
