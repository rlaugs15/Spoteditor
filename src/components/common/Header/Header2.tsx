import { Button } from '@/components/ui/button';
import { HOME } from '@/constants/pathname';
import { Link } from '@/i18n/navigation';
import BackButton from '../Button/BackButton';
import { HomeIcon } from '../Icons';

const Header2 = () => {
  return (
    <header className="py-[15px] bg-white space-x-2">
      <BackButton plain />
      <Button variant={'ghost'} size={'icon'} asChild>
        <Link href={HOME}>
          <HomeIcon />
        </Link>
      </Button>
    </header>
  );
};

export default Header2;
