'use client';
import { Button } from '@/components/ui/button';
import { REGISTER_PATHS } from '@/constants/pathname';
import { TagKeys, useLogCreationStore } from '@/stores/logCreationStore';
import { RegisterPath } from '@/types/path';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RegisterFooterProps {
  tagTargets?: TagKeys[];
  nextPath: RegisterPath;
  delayBtn?: boolean;
}

const RegisterFooter = ({ tagTargets, nextPath, delayBtn }: RegisterFooterProps) => {
  const router = useRouter();
  const t = useTranslations('Register.Footer');
  const handleClick = () => router.push(nextPath);
  const totalSelectedCount = useLogCreationStore((state) =>
    tagTargets?.reduce((sum, key) => sum + state[key].length, 0)
  );
  const isDisabled = totalSelectedCount === 0;
  return (
    <div className="flex flex-col pt-2 pb-6 gap-[15px]">
      <Button size={'xl'} className="font-bold" onClick={handleClick} disabled={isDisabled}>
        {t('next')}
      </Button>
      {delayBtn && (
        <Link href={REGISTER_PATHS.COUNTRY} className="text-center text-text-xs text-light-300">
          {t('skip')}
        </Link>
      )}
    </div>
  );
};

export default RegisterFooter;
