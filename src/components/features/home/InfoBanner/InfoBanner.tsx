import { cn } from '@/lib/utils';
import React from 'react';

interface InfoBannerProps {
  children: React.ReactNode;
  className?: string;
}

const InfoBanner = ({ children, className }: InfoBannerProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center h-full !text-light-400 text-text-sm web:text-text-lg web:py-10 space-y-6 text-center',
        className
      )}
    >
      {children}
    </div>
  );
};

export default InfoBanner;
