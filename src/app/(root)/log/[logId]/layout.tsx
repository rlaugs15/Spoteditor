import React from 'react';

interface DetailLogLayoutProps {
  children: React.ReactNode;
  placeCollect: React.ReactNode;
}

const DetailLogLayout = ({ children, placeCollect }: DetailLogLayoutProps) => {
  return (
    <>
      {placeCollect}
      {children}
    </>
  );
};

export default DetailLogLayout;
