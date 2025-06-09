import { getUser } from '@/app/actions/user';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { GlobeBlackIcon, GlobeIcon } from '../../Icons';
import Logo from '../Logo';
import SearchBar from './components/SearchBar';
import SearchBarButton from './components/SearchBarButton';
import ClientOnlyLoginStatusButtons from './components/UserProfileButton/ClientOnlyLoginStatusButtons';

const Header = async () => {
  const user = await getUser();
  return (
    <header className="flex items-center justify-between sticky w-full z-50 bg-black px-4 web:px-[50px] py-4 web:py-5 left-0 top-0 web:h-[60px] h-12">
      <Logo />
      <section className="flex items-center text-white web:gap-11">
        <SearchBarButton />
        <Popover>
          <PopoverTrigger asChild>
            <Button variant={'ghost'} size={'icon'} className="relative group">
              <GlobeIcon className="absolute group-hover:opacity-0" />
              <GlobeBlackIcon className="opacity-0 group-hover:opacity-100" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>준비중입니다.</PopoverContent>
        </Popover>
        <ClientOnlyLoginStatusButtons user={user} />
      </section>
      <SearchBar />
    </header>
  );
};

export default Header;
