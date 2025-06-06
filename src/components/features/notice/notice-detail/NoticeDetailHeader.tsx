'use client';

import { ArrowLeftIcon } from '@/components/common/Icons';
import { AnimatePresence, motion, useScroll } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface NoticeDetailHeaderProps {
  title: string;
  time: string;
}

export default function NoticeDetailHeader({ title, time }: NoticeDetailHeaderProps) {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setShow(latest >= 64);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <>
      <header className="sticky top-0 flex items-center gap-2.5 bg-white w-full pt-3 border-b min-h-[54px] z-10">
        <div>
          <button onClick={() => router.back()} className="py-2 pl-4">
            <ArrowLeftIcon className="w-[17px] h-[17px]" />
          </button>
        </div>
        <AnimatePresence mode="popLayout">
          {show && (
            <motion.div
              className="w-full overflow-hidden"
              initial={{ opacity: 0, maskPosition: '100% 0%' }}
              animate={{ opacity: 1, maskPosition: '0% 0%' }}
              exit={{ opacity: 0, maskPosition: '100% 0%' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <h2 className="font-bold truncate text-text-lg web:text-md">{title}</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className="w-full pt-[15px] px-4 flex flex-col justify-center items-start gap-1">
        <h2 className="w-full font-bold text-md">{title}</h2>
        <time className="text-text-xs text-primary-400 font-regular">{time}</time>
      </div>
    </>
  );
}
