import { Button } from '@/components/ui/button';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';
import BackButton from '../Button/BackButton';
import { HomeIcon } from '../Icons';

const Header2 = async () => {
  const locale = await getLocale();
  return (
    <header className="py-[15px] bg-white space-x-2">
      <BackButton plain />
      <Button variant={'ghost'} size={'icon'} asChild>
        <Link href={`/${locale}`}>
          <HomeIcon />
        </Link>
      </Button>
    </header>
  );
};

export default Header2;
