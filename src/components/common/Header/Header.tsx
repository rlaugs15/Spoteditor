import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import { AlertIcon, GlobeIcon, SearchIcon, UserIcon } from '../Icons';
import Logo from './Logo';

const Header = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
        {!user && (
          <Button variant={'ghost'} className="font-bold">
            회원가입/로그인
          </Button>
        )}
        {user && (
          <>
            <Button variant={'ghost'} size={'icon'}>
              <AlertIcon />
            </Button>
            <Button variant={'ghost'} size={'icon'}>
              <UserIcon />
            </Button>
          </>
        )}
      </section>
    </header>
  );
};

export default Header;
