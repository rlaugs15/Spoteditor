'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useRouter } from 'next/navigation';

interface TabNavButtonProps {
  userId: string;
  tabKey: string;
  tabName: string;
}

export default function TabNavButton({ userId, tabKey, tabName }: TabNavButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = pathname === `/profile/${userId}/${tabKey}`;
  return (
    <div className="relative">
      <button
        onClick={() => router.push(`/profile/${userId}/${tabKey}`)}
        className={cn(
          'py-2 web:py-3 font-bold text-text-sm web:text-text-xl',
          isActive ? 'text-black' : 'text-light-200'
        )}
      >
        {tabName}
      </button>
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            exit={{ width: 0 }}
            className="bg-black h-[3px] absolute bottom-0 left-0"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
