'use client';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { RegisterPath } from '@/types/path';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RegisterFooterProps {
  tagTargets?: TagKeys[];
  nextPath: RegisterPath;
  delayBtn?: boolean;
}

const RegisterFooter = ({ tagTargets, nextPath, delayBtn }: RegisterFooterProps) => {
  const router = useRouter();
  const handleClick = () => router.push(nextPath);
  const totalSelectedCount = useLogCreationStore((state) =>
    tagTargets?.reduce((sum, key) => sum + state[key].length, 0)
  );
  const isDisabled = totalSelectedCount === 0;
  return (
    <div className="flex flex-col pt-2 pb-6 gap-[15px]">
      <Button
        size={'xl'}
        className="font-bold text-[13px]"
        onClick={handleClick}
        disabled={isDisabled}
      >
        다음
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
