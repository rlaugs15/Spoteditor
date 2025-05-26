import { getUser } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { GlobeIcon } from '../../Icons';
import Logo from '../Logo';
import LoginStatusButtons from './components/LoginStatusButtons';
import SearchBar from './components/SearchBar';
import SearchBarButton from './components/SearchBarButton';

const Header = async () => {
  const user = await getUser();
  return (
    <header className="flex items-center justify-between sticky w-full z-50 bg-black px-4 web:px-[50px] py-4 web:py-5 left-0 top-0 web:h-[60px] h-12">
      <Logo />
      <section className="flex items-center text-white web:gap-5">
        <SearchBarButton />
        <Button variant={'ghost'} size={'icon'}>
          <GlobeIcon />
        </Button>
        <LoginStatusButtons user={user} />
      </section>
      <SearchBar />
    </header>
  );
};

export default Header;
