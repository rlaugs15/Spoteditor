'use client';
import { useLogCreationStore } from '@/stores/logCreationStore';
import { PropsWithChildren, useEffect } from 'react';

const WriteLayout = ({ children }: PropsWithChildren) => {
  const clearTag = useLogCreationStore((state) => state.clearTag);
  useEffect(() => {
    return () => clearTag();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col max-w-[724px] mx-auto h-dvh font-pretendard">
      <div className="grow px-4 bg-white overflow-y-auto">{children}</div>
    </div>
  );
};

export default WriteLayout;
