'use client';

import { Button } from '@/components/ui/button';
import useUser from '@/hooks/queries/user/useUser';
import Link from 'next/link';
import UserProfileButton from './UserProfileButton/UserProfileButton';

export default function LoginStatusButtons() {
  const { data: user } = useUser();
  return (
    <>
      {!user ? (
        <Link href="/login">
          <Button variant={'ghost'} className="font-bold">
            회원가입/로그인
          </Button>
        </Link>
      ) : (
        <>
          {/* <Button variant={'ghost'} size={'icon'}>
            <AlertIcon />
          </Button> */}
          <UserProfileButton />
        </>
      )}
    </>
  );
}
