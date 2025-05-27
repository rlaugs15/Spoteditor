'use client';

import { Button } from '@/components/ui/button';
import { IUser } from '@/types/api/user';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const UserProfileButton = dynamic(() => import('./UserProfileButton/UserProfileButton'), {
  ssr: false,
});

interface LoginStatusButtonsProps {
  user: IUser;
}

export default function LoginStatusButtons({ user }: LoginStatusButtonsProps) {
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
          <UserProfileButton user={user} />
        </>
      )}
    </>
  );
}
