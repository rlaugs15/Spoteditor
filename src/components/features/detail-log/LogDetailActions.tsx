'use client';

import { PenBlackIcon, TableIcon } from '@/components/common/Icons';
import { Link } from '@/i18n/navigation';
import ExtraActionButton from './ExtraActionButton';
import LogBookmarkWithCount from './LogBookmarkWithCount';

interface LogDetailActionsProps {
  isAuthor: boolean;
  logId: string;
}

export default function LogDetailActions({ isAuthor, logId }: LogDetailActionsProps) {
  return (
    <div className="flex flex-col items-center gap-2 fixed z-10 bottom-10 web:right-[50px] right-4">
      {isAuthor ? (
        <ExtraActionButton className="w-11 h-11">
          <Link href={`/${logId}/edit`}>
            <PenBlackIcon />
          </Link>
        </ExtraActionButton>
      ) : (
        <LogBookmarkWithCount logId={logId} />
      )}
      <ExtraActionButton className="w-11 h-11" asChild>
        <Link href={`/log/${logId}/placeCollect`}>
          <TableIcon />
        </Link>
      </ExtraActionButton>
    </div>
  );
}
