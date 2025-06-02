'use client';

import { useCitySearchStore } from '@/stores/searchStore';
import { AnimatePresence, motion, useMotionTemplate, Variants } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import CitySearchDropbox from './components/CitySearchDropbox';

const dropboxVar: Variants = {
  start: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  end: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

export default function SearchDropBox() {
  const pathname = usePathname();
  const isDropBox = useCitySearchStore((state) => state.isDropBox);
  //함수 추출 고정화
  const closeDropBox = useCitySearchStore.getState().closeDropBox;

  /* 드롭박스 마운트, 언마운트 시 transformOrigin 값 변경 */
  const transformOrigin = useMotionTemplate`top ${isDropBox ? 'left' : 'right'} `;

  useEffect(() => {
    closeDropBox();
  }, [pathname]);
  return (
    <AnimatePresence>
      {isDropBox ? (
        <motion.section
          className="z-[1111] web:z-10 fixed overflow-hidden web:absolute top-0 web:top-[93px] left-0 web:left-auto bg-white w-screen h-screen web:h-auto web:max-w-[calc(100%)] px-4 web:py-5 web:pl-[30px] web:pr-5 flex flex-col gap-[18px] web:gap-2.5"
          key="dropbox"
          variants={dropboxVar}
          initial="start"
          animate="visible"
          exit="end"
          style={{
            transformOrigin,
          }}
        >
          <CitySearchDropbox />
        </motion.section>
      ) : null}
    </AnimatePresence>
  );
}
