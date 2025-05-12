'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import UserProfileButton from './UserProfileButton/UserProfileButton';
import { IUser } from '@/types/api/user';

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
          <UserProfileButton />
        </>
      )}
    </>
  );
}
