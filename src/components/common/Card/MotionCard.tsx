import { cn } from '@/lib/utils';
import { Variants } from 'motion/react';
import * as motion from 'motion/react-client';

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
    <motion.div
      variants={cardVar}
      initial="start"
      animate="end"
      className={cn('w-full flex flex-col', className)}
    >
      {children}
    </motion.div>
  );
}
