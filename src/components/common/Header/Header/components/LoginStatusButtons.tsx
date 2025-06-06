'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { IUser } from '@/types/api/user';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const UserProfileButton = dynamic(() => import('./UserProfileButton/UserProfileButton'), {
  ssr: false,
  loading: () => (
    <div className="w-9 flex justify-center">
      <Skeleton className="w-6 h-6 rounded-full opacity-25" />
    </div>
  ),
});

interface LoginStatusButtonsProps {
  user: IUser;
}

export default function LoginStatusButtons({ user }: LoginStatusButtonsProps) {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <>
      {!user ? (
        <Button onClick={handleLoginClick} variant={'ghost'} className="font-bold">
          회원가입/로그인
        </Button>
      ) : (
        <UserProfileButton user={user} />
      )}
    </>
  );
}
