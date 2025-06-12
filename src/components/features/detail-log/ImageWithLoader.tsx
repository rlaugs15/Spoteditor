'use client';
import Image from 'next/image';
import { useState } from 'react';

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  sizes?: string;
  onClick?: () => void;
}

const ImageWithLoader = ({
  src,
  alt,
  className = '',
  fill = false,
  sizes,
  onClick,
}: ImageWithLoaderProps) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="w-6 h-6 animate-spin border-2 border-gray-400 border-t-transparent rounded-full" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={`${className} transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes={sizes}
        onClick={onClick}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />
    </div>
  );
};

export default ImageWithLoader;
