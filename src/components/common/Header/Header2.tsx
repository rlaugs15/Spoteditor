import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import Link from 'next/link';
import BackButton from '../Button/BackButton';
import { HomeIcon } from '../Icons';

const Header2 = () => {
  return (
    <header className="py-[15px] bg-white">
      <BackButton />
      <Button variant={'ghost'} size={'icon'} asChild>
        <Link href={HOME}>
          <HomeIcon />
        </Link>
      </Button>
    </header>
  );
};

export default Header2;
