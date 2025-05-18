'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';

interface TabButtonProps {
  userId: string;
  tabKey: 'myLog' | 'savedSpaces' | 'savedLog';
  tabName: string;
  tab: 'myLog' | 'savedSpaces' | 'savedLog';
  onTabClick: (tab: 'myLog' | 'savedSpaces' | 'savedLog') => void;
}

export default function TabButton({ tabKey, tabName, tab, onTabClick }: TabButtonProps) {
  const isActive = tab === tabKey;
  return (
    <div className="relative">
      <button
        onClick={() => onTabClick(tabKey)}
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
