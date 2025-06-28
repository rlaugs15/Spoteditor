'use client';

import LogBookMarkButton from '@/components/common/Button/Bookmark/LogBookMarkButton';
import useLog from '@/hooks/queries/log/useLog';
import { formatCount } from '@/lib/utils';
import ExtraActionButton from './ExtraActionButton';

interface LogBookmarkWithCountProps {
  logId: string;
}

export default function LogBookmarkWithCount({ logId }: LogBookmarkWithCountProps) {
  const { data } = useLog(logId);

  const bookmarkCount =
    data?.success && data.data?._count?.log_bookmark ? data.data._count.log_bookmark : 0;
  return (
    <section className="flex flex-col items-center gap-1.5">
      <div className="w-11 h-6.5 px-1.5 bg-black rounded-[999px] flex justify-center items-center border-2 border-white">
        <span className="text-white text-text-lg font-bold">
          {formatCount(Number(bookmarkCount))}
        </span>
      </div>
      <ExtraActionButton className="w-11 h-11" asChild>
        <div className="flex flex-col">
          <LogBookMarkButton logId={logId} className="rounded-full relative !top-0 !right-0" />
        </div>
      </ExtraActionButton>
    </section>
  );
}
