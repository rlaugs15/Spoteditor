import React from 'react';

interface InfoBannerProps {
  children: React.ReactNode;
}
const InfoBanner = ({ children }: InfoBannerProps) => {
  return (
    <div className="flex flex-col justify-between text-light-300 text-text-sm web:text-text-lg border-t border-b border-light-100 py-12">
      {children}
    </div>
  );
};

export default InfoBanner;
