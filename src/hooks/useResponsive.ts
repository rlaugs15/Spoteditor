import { useEffect, useState } from 'react';

export default function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    updateSize(); // 첫 진입 시 한 번 실행
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return {
    isMobile,
    isWeb: !isMobile,
  };
}
