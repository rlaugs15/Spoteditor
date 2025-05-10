'use client';

import { ArrowLeftIcon } from '@/app/_components/icons';
import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HomeIcon } from '../Icons';

const Header2 = () => {
  const router = useRouter();
  return (
    <header className="py-[15px] bg-white">
      <Button variant={'ghost'} size={'icon'} onClick={() => router.back()}>
        <ArrowLeftIcon />
      </Button>
      <Button variant={'ghost'} size={'icon'}>
        <Link href={HOME}>
          <HomeIcon />
        </Link>
      </Button>
    </header>
  );
};

export default Header2;
