'use client';
import { REGISTER_PATHS } from '@/constants/pathname';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

const LogWriteLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const country = useLogCreationStore((state) => state.country);
  const city = useLogCreationStore((state) => state.city);
  const sigungu = useLogCreationStore((state) => state.sigungu);

  useEffect(() => {
    if (!country || !city || !sigungu) router.replace(REGISTER_PATHS.MOOD);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="h-full">{children}</div>;
};

export default LogWriteLayout;
