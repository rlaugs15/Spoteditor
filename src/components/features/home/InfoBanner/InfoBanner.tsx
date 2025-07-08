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
        'flex flex-col justify-between !text-light-300 text-text-sm web:text-text-lg border-b border-light-100 py-5 web:py-12',
        className
      )}
    >
      {children}
    </div>
  );
};

export default InfoBanner;
