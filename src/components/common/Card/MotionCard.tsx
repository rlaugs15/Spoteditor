import { cn } from '@/lib/utils';
import { LazyMotion, Variants, domAnimation } from 'motion/react';
import * as m from 'motion/react-m';

interface MotionCardProps {
  className?: string;
  children: React.ReactNode;
}

const cardVar: Variants = {
  start: { y: 20, opacity: 0 },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function MotionCard({ className, children }: MotionCardProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        variants={cardVar}
        initial="start"
        animate="end"
        className={cn('w-full flex flex-col', className)}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
