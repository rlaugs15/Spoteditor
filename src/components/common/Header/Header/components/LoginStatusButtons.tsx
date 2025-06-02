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
        <Button variant={'ghost'} className="font-bold" asChild>
          <Link href="/login">회원가입/로그인</Link>
        </Button>
      ) : (
        <>
          <UserProfileButton user={user} />
        </>
      )}
    </>
  );
}
