import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { RegisterPath } from '@/types/path';
import Link from 'next/link';

interface RegisterFooterProps {
  nextPath: RegisterPath;
  delayBtn?: boolean;
}

const RegisterFooter = ({ nextPath, delayBtn }: RegisterFooterProps) => {
  return (
    <div className="flex flex-col pt-2 pb-6 gap-[15px]">
      <Button size={'xl'} className="font-bold" asChild>
        <Link href={nextPath}>다음</Link>
      </Button>
      {delayBtn && (
        <Link href={REGISTER_PATHS.COUNTRY} className="text-center text-text-xs text-light-300">
          다음에 하기
        </Link>
      )}
    </div>
  );
};

export default RegisterFooter;
