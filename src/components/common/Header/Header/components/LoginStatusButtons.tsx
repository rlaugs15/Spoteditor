'use client';

import { UserBlackIcon, UserIcon } from '@/components/common/Icons';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from '@/i18n/navigation';
import { trackLoginEvent } from '@/lib/analytics';
import { IUser } from '@/types/api/user';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';

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
  const { isMobile } = useResponsive();
  const t = useTranslations('LoginStatus');

  const handleLoginClick = () => {
    trackLoginEvent('header');
    router.push('/login');
  };

  if (isMobile) {
    return (
      <>
        {!user ? (
          <Button
            onClick={handleLoginClick}
            variant={'ghost'}
            size={'icon'}
            className="relative group"
          >
            <UserIcon className="absolute group-hover:opacity-0" />
            <UserBlackIcon className="opacity-0 group-hover:opacity-100" />
          </Button>
        ) : (
          <UserProfileButton user={user} />
        )}
      </>
    );
  }

  return (
    <>
      {!user ? (
        <Button onClick={handleLoginClick} variant={'ghost'} className="font-bold">
          {t('loginOrSignup')}
        </Button>
      ) : (
        <UserProfileButton user={user} />
      )}
    </>
  );
}
