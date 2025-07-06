'use client';

import LogBookMarkButton from '@/components/common/Button/Bookmark/LogBookMarkButton';
import { formatCount } from '@/lib/utils';
import { useState } from 'react';
import ExtraActionButton from './ExtraActionButton';

interface LogBookmarkWithCountProps {
  logId: string;
  initialCount: number;
}

export default function LogBookmarkWithCount({ logId, initialCount }: LogBookmarkWithCountProps) {
  const [bookmarkCount, setBookmarkCount] = useState(initialCount);

  const handleToggle = (newStatus: boolean) => {
    setBookmarkCount((prev) => prev + (newStatus ? 1 : -1));
  };
  return (
    <section className="flex flex-col items-center gap-1.5">
      <div className="w-11 h-6.5 px-1.5 bg-black rounded-[999px] flex justify-center items-center border-2 border-white">
        <span className="text-white text-text-lg font-bold">{formatCount(bookmarkCount)}</span>
      </div>
      <ExtraActionButton className="w-11 h-11" asChild>
        <div className="flex flex-col">
          <LogBookMarkButton
            logId={logId}
            onToggle={handleToggle}
            className="rounded-full relative !top-0 !right-0"
          />
        </div>
      </ExtraActionButton>
    </section>
  );
}
