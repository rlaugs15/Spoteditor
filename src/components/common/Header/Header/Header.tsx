import { Button } from '@/components/ui/button';
import { GlobeIcon, SearchIcon } from '../../Icons';
import Logo from '../Logo';
import LoginStatusButtons from './components/LoginStatusButtons';
import { getUser } from '@/app/actions/user';

const Header = async () => {
  const user = getUser();
  return (
    <header className="flex items-center justify-between sticky w-full z-50 bg-black px-4 web:px-[50px] py-4 web:py-5 left-0 top-0 web:h-[60px] h-12">
      <Logo />
      <section className="flex items-center text-white web:gap-5">
        <Button variant={'ghost'} size={'icon'}>
          <SearchIcon />
        </Button>
        <Button variant={'ghost'} size={'icon'}>
          <GlobeIcon />
        </Button>
        <LoginStatusButtons user={user} />
      </section>
    </header>
  );
};

export default Header;
