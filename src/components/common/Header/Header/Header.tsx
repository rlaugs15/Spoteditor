import { getUser } from '@/app/actions/user';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Logo from '../Logo';
import SearchBar from './components/SearchBar';
import SearchBarButton from './components/SearchBarButton';
import ToggleLocaleButton from './components/ToggleLocaleButton';
import ClientOnlyLoginStatusButtons from './components/UserProfileButton/ClientOnlyLoginStatusButtons';

const Header = async () => {
  const user = await getUser();
  return (
    <header className="flex items-center justify-between fixed w-full z-50 bg-black px-4 web:px-[50px] py-4 web:py-5 left-0 top-0 web:h-[60px] h-12">
      <Logo />
      <section className="flex items-center text-white web:gap-11">
        <SearchBarButton />
        <Popover>
          <PopoverTrigger asChild>
            <ToggleLocaleButton />
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
