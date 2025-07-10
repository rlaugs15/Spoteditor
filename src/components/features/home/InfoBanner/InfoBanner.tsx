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
        'flex flex-col justify-between !text-light-400 text-text-sm web:text-text-lg py-4 web:py-15',
        className
      )}
    >
      {children}
    </div>
  );
};

export default InfoBanner;
